import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITarif } from 'app/entities/tarif/tarif.model';
import { TarifService } from 'app/entities/tarif/service/tarif.service';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
import { ITarifCommercant } from '../tarif-commercant.model';
import { TarifCommercantService } from '../service/tarif-commercant.service';
import { TarifCommercantFormService } from './tarif-commercant-form.service';

import { TarifCommercantUpdateComponent } from './tarif-commercant-update.component';

describe('TarifCommercant Management Update Component', () => {
  let comp: TarifCommercantUpdateComponent;
  let fixture: ComponentFixture<TarifCommercantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tarifCommercantFormService: TarifCommercantFormService;
  let tarifCommercantService: TarifCommercantService;
  let tarifService: TarifService;
  let parametrageService: ParametrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TarifCommercantUpdateComponent],
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
      .overrideTemplate(TarifCommercantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifCommercantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tarifCommercantFormService = TestBed.inject(TarifCommercantFormService);
    tarifCommercantService = TestBed.inject(TarifCommercantService);
    tarifService = TestBed.inject(TarifService);
    parametrageService = TestBed.inject(ParametrageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call tarif query and add missing value', () => {
      const tarifCommercant: ITarifCommercant = { id: 456 };
      const tarif: ITarif = { id: 14628 };
      tarifCommercant.tarif = tarif;

      const tarifCollection: ITarif[] = [{ id: 6166 }];
      jest.spyOn(tarifService, 'query').mockReturnValue(of(new HttpResponse({ body: tarifCollection })));
      const expectedCollection: ITarif[] = [tarif, ...tarifCollection];
      jest.spyOn(tarifService, 'addTarifToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tarifCommercant });
      comp.ngOnInit();

      expect(tarifService.query).toHaveBeenCalled();
      expect(tarifService.addTarifToCollectionIfMissing).toHaveBeenCalledWith(tarifCollection, tarif);
      expect(comp.tarifsCollection).toEqual(expectedCollection);
    });

    it('Should call Parametrage query and add missing value', () => {
      const tarifCommercant: ITarifCommercant = { id: 456 };
      const parametrage: IParametrage = { id: 5011 };
      tarifCommercant.parametrage = parametrage;

      const parametrageCollection: IParametrage[] = [{ id: 14619 }];
      jest.spyOn(parametrageService, 'query').mockReturnValue(of(new HttpResponse({ body: parametrageCollection })));
      const additionalParametrages = [parametrage];
      const expectedCollection: IParametrage[] = [...additionalParametrages, ...parametrageCollection];
      jest.spyOn(parametrageService, 'addParametrageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tarifCommercant });
      comp.ngOnInit();

      expect(parametrageService.query).toHaveBeenCalled();
      expect(parametrageService.addParametrageToCollectionIfMissing).toHaveBeenCalledWith(
        parametrageCollection,
        ...additionalParametrages.map(expect.objectContaining),
      );
      expect(comp.parametragesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tarifCommercant: ITarifCommercant = { id: 456 };
      const tarif: ITarif = { id: 9487 };
      tarifCommercant.tarif = tarif;
      const parametrage: IParametrage = { id: 20865 };
      tarifCommercant.parametrage = parametrage;

      activatedRoute.data = of({ tarifCommercant });
      comp.ngOnInit();

      expect(comp.tarifsCollection).toContain(tarif);
      expect(comp.parametragesSharedCollection).toContain(parametrage);
      expect(comp.tarifCommercant).toEqual(tarifCommercant);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifCommercant>>();
      const tarifCommercant = { id: 123 };
      jest.spyOn(tarifCommercantFormService, 'getTarifCommercant').mockReturnValue(tarifCommercant);
      jest.spyOn(tarifCommercantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifCommercant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifCommercant }));
      saveSubject.complete();

      // THEN
      expect(tarifCommercantFormService.getTarifCommercant).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tarifCommercantService.update).toHaveBeenCalledWith(expect.objectContaining(tarifCommercant));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifCommercant>>();
      const tarifCommercant = { id: 123 };
      jest.spyOn(tarifCommercantFormService, 'getTarifCommercant').mockReturnValue({ id: null });
      jest.spyOn(tarifCommercantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifCommercant: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifCommercant }));
      saveSubject.complete();

      // THEN
      expect(tarifCommercantFormService.getTarifCommercant).toHaveBeenCalled();
      expect(tarifCommercantService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifCommercant>>();
      const tarifCommercant = { id: 123 };
      jest.spyOn(tarifCommercantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifCommercant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tarifCommercantService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTarif', () => {
      it('Should forward to tarifService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tarifService, 'compareTarif');
        comp.compareTarif(entity, entity2);
        expect(tarifService.compareTarif).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
