import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

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

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tarif: ITarif = { id: 456 };

      activatedRoute.data = of({ tarif });
      comp.ngOnInit();

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
});
