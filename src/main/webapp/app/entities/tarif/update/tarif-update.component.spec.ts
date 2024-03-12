import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { TarifReferenceOptionService } from 'app/entities/tarif-reference-option/service/tarif-reference-option.service';
import { TarifService } from '../service/tarif.service';
import { ITarif } from '../tarif.model';
import { TarifFormService } from './tarif-form.service';

import { TarifUpdateComponent } from './tarif-update.component';

describe('Tarif Management Update Component', () => {
  let comp: TarifUpdateComponent;
  let fixture: ComponentFixture<TarifUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tarifFormService: TarifFormService;
  let tarifService: TarifService;
  let tarifReferenceOptionService: TarifReferenceOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TarifUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TarifUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tarifFormService = TestBed.inject(TarifFormService);
    tarifService = TestBed.inject(TarifService);
    tarifReferenceOptionService = TestBed.inject(TarifReferenceOptionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call tarifReferenceOption query and add missing value', () => {
      const tarif: ITarif = { id: 456 };
      const tarifReferenceOption: ITarifReferenceOption = { id: 25681 };
      tarif.tarifReferenceOption = tarifReferenceOption;

      const tarifReferenceOptionCollection: ITarifReferenceOption[] = [{ id: 1515 }];
      jest.spyOn(tarifReferenceOptionService, 'query').mockReturnValue(of(new HttpResponse({ body: tarifReferenceOptionCollection })));
      const expectedCollection: ITarifReferenceOption[] = [tarifReferenceOption, ...tarifReferenceOptionCollection];
      jest.spyOn(tarifReferenceOptionService, 'addTarifReferenceOptionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tarif });
      comp.ngOnInit();

      expect(tarifReferenceOptionService.query).toHaveBeenCalled();
      expect(tarifReferenceOptionService.addTarifReferenceOptionToCollectionIfMissing).toHaveBeenCalledWith(
        tarifReferenceOptionCollection,
        tarifReferenceOption,
      );
      expect(comp.tarifReferenceOptionsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tarif: ITarif = { id: 456 };
      const tarifReferenceOption: ITarifReferenceOption = { id: 32393 };
      tarif.tarifReferenceOption = tarifReferenceOption;

      activatedRoute.data = of({ tarif });
      comp.ngOnInit();

      expect(comp.tarifReferenceOptionsCollection).toContain(tarifReferenceOption);
      expect(comp.tarif).toEqual(tarif);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarif>>();
      const tarif = { id: 123 };
      jest.spyOn(tarifFormService, 'getTarif').mockReturnValue(tarif);
      jest.spyOn(tarifService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarif });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarif }));
      saveSubject.complete();

      // THEN
      expect(tarifFormService.getTarif).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tarifService.update).toHaveBeenCalledWith(expect.objectContaining(tarif));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarif>>();
      const tarif = { id: 123 };
      jest.spyOn(tarifFormService, 'getTarif').mockReturnValue({ id: null });
      jest.spyOn(tarifService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarif: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarif }));
      saveSubject.complete();

      // THEN
      expect(tarifFormService.getTarif).toHaveBeenCalled();
      expect(tarifService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarif>>();
      const tarif = { id: 123 };
      jest.spyOn(tarifService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarif });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tarifService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTarifReferenceOption', () => {
      it('Should forward to tarifReferenceOptionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tarifReferenceOptionService, 'compareTarifReferenceOption');
        comp.compareTarifReferenceOption(entity, entity2);
        expect(tarifReferenceOptionService.compareTarifReferenceOption).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
