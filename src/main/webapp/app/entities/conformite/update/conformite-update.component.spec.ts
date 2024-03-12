import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
import { ConformiteService } from '../service/conformite.service';
import { IConformite } from '../conformite.model';
import { ConformiteFormService } from './conformite-form.service';

import { ConformiteUpdateComponent } from './conformite-update.component';

describe('Conformite Management Update Component', () => {
  let comp: ConformiteUpdateComponent;
  let fixture: ComponentFixture<ConformiteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conformiteFormService: ConformiteFormService;
  let conformiteService: ConformiteService;
  let parametrageService: ParametrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ConformiteUpdateComponent],
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
      .overrideTemplate(ConformiteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConformiteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conformiteFormService = TestBed.inject(ConformiteFormService);
    conformiteService = TestBed.inject(ConformiteService);
    parametrageService = TestBed.inject(ParametrageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Parametrage query and add missing value', () => {
      const conformite: IConformite = { id: 456 };
      const parametrage: IParametrage = { id: 251 };
      conformite.parametrage = parametrage;

      const parametrageCollection: IParametrage[] = [{ id: 26595 }];
      jest.spyOn(parametrageService, 'query').mockReturnValue(of(new HttpResponse({ body: parametrageCollection })));
      const additionalParametrages = [parametrage];
      const expectedCollection: IParametrage[] = [...additionalParametrages, ...parametrageCollection];
      jest.spyOn(parametrageService, 'addParametrageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      expect(parametrageService.query).toHaveBeenCalled();
      expect(parametrageService.addParametrageToCollectionIfMissing).toHaveBeenCalledWith(
        parametrageCollection,
        ...additionalParametrages.map(expect.objectContaining),
      );
      expect(comp.parametragesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const conformite: IConformite = { id: 456 };
      const parametrage: IParametrage = { id: 3415 };
      conformite.parametrage = parametrage;

      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      expect(comp.parametragesSharedCollection).toContain(parametrage);
      expect(comp.conformite).toEqual(conformite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConformite>>();
      const conformite = { id: 123 };
      jest.spyOn(conformiteFormService, 'getConformite').mockReturnValue(conformite);
      jest.spyOn(conformiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conformite }));
      saveSubject.complete();

      // THEN
      expect(conformiteFormService.getConformite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conformiteService.update).toHaveBeenCalledWith(expect.objectContaining(conformite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConformite>>();
      const conformite = { id: 123 };
      jest.spyOn(conformiteFormService, 'getConformite').mockReturnValue({ id: null });
      jest.spyOn(conformiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conformite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conformite }));
      saveSubject.complete();

      // THEN
      expect(conformiteFormService.getConformite).toHaveBeenCalled();
      expect(conformiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConformite>>();
      const conformite = { id: 123 };
      jest.spyOn(conformiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conformiteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareParametrage', () => {
      it('Should forward to parametrageService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(parametrageService, 'compareParametrage');
        comp.compareParametrage(entity, entity2);
        expect(parametrageService.compareParametrage).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
