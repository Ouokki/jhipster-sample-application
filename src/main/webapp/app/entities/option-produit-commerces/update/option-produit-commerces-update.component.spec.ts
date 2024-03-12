import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { TarifReferenceOptionService } from 'app/entities/tarif-reference-option/service/tarif-reference-option.service';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
import { IOptionProduitCommerces } from '../option-produit-commerces.model';
import { OptionProduitCommercesService } from '../service/option-produit-commerces.service';
import { OptionProduitCommercesFormService } from './option-produit-commerces-form.service';

import { OptionProduitCommercesUpdateComponent } from './option-produit-commerces-update.component';

describe('OptionProduitCommerces Management Update Component', () => {
  let comp: OptionProduitCommercesUpdateComponent;
  let fixture: ComponentFixture<OptionProduitCommercesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let optionProduitCommercesFormService: OptionProduitCommercesFormService;
  let optionProduitCommercesService: OptionProduitCommercesService;
  let tarifReferenceOptionService: TarifReferenceOptionService;
  let parametrageService: ParametrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OptionProduitCommercesUpdateComponent],
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
      .overrideTemplate(OptionProduitCommercesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OptionProduitCommercesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    optionProduitCommercesFormService = TestBed.inject(OptionProduitCommercesFormService);
    optionProduitCommercesService = TestBed.inject(OptionProduitCommercesService);
    tarifReferenceOptionService = TestBed.inject(TarifReferenceOptionService);
    parametrageService = TestBed.inject(ParametrageService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call tarifReferenceOption query and add missing value', () => {
      const optionProduitCommerces: IOptionProduitCommerces = { id: 456 };
      const tarifReferenceOption: ITarifReferenceOption = { id: 5735 };
      optionProduitCommerces.tarifReferenceOption = tarifReferenceOption;

      const tarifReferenceOptionCollection: ITarifReferenceOption[] = [{ id: 20835 }];
      jest.spyOn(tarifReferenceOptionService, 'query').mockReturnValue(of(new HttpResponse({ body: tarifReferenceOptionCollection })));
      const expectedCollection: ITarifReferenceOption[] = [tarifReferenceOption, ...tarifReferenceOptionCollection];
      jest.spyOn(tarifReferenceOptionService, 'addTarifReferenceOptionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ optionProduitCommerces });
      comp.ngOnInit();

      expect(tarifReferenceOptionService.query).toHaveBeenCalled();
      expect(tarifReferenceOptionService.addTarifReferenceOptionToCollectionIfMissing).toHaveBeenCalledWith(
        tarifReferenceOptionCollection,
        tarifReferenceOption,
      );
      expect(comp.tarifReferenceOptionsCollection).toEqual(expectedCollection);
    });

    it('Should call Parametrage query and add missing value', () => {
      const optionProduitCommerces: IOptionProduitCommerces = { id: 456 };
      const parametrage: IParametrage = { id: 26379 };
      optionProduitCommerces.parametrage = parametrage;

      const parametrageCollection: IParametrage[] = [{ id: 15633 }];
      jest.spyOn(parametrageService, 'query').mockReturnValue(of(new HttpResponse({ body: parametrageCollection })));
      const additionalParametrages = [parametrage];
      const expectedCollection: IParametrage[] = [...additionalParametrages, ...parametrageCollection];
      jest.spyOn(parametrageService, 'addParametrageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ optionProduitCommerces });
      comp.ngOnInit();

      expect(parametrageService.query).toHaveBeenCalled();
      expect(parametrageService.addParametrageToCollectionIfMissing).toHaveBeenCalledWith(
        parametrageCollection,
        ...additionalParametrages.map(expect.objectContaining),
      );
      expect(comp.parametragesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const optionProduitCommerces: IOptionProduitCommerces = { id: 456 };
      const tarifReferenceOption: ITarifReferenceOption = { id: 7972 };
      optionProduitCommerces.tarifReferenceOption = tarifReferenceOption;
      const parametrage: IParametrage = { id: 10568 };
      optionProduitCommerces.parametrage = parametrage;

      activatedRoute.data = of({ optionProduitCommerces });
      comp.ngOnInit();

      expect(comp.tarifReferenceOptionsCollection).toContain(tarifReferenceOption);
      expect(comp.parametragesSharedCollection).toContain(parametrage);
      expect(comp.optionProduitCommerces).toEqual(optionProduitCommerces);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOptionProduitCommerces>>();
      const optionProduitCommerces = { id: 123 };
      jest.spyOn(optionProduitCommercesFormService, 'getOptionProduitCommerces').mockReturnValue(optionProduitCommerces);
      jest.spyOn(optionProduitCommercesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ optionProduitCommerces });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: optionProduitCommerces }));
      saveSubject.complete();

      // THEN
      expect(optionProduitCommercesFormService.getOptionProduitCommerces).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(optionProduitCommercesService.update).toHaveBeenCalledWith(expect.objectContaining(optionProduitCommerces));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOptionProduitCommerces>>();
      const optionProduitCommerces = { id: 123 };
      jest.spyOn(optionProduitCommercesFormService, 'getOptionProduitCommerces').mockReturnValue({ id: null });
      jest.spyOn(optionProduitCommercesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ optionProduitCommerces: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: optionProduitCommerces }));
      saveSubject.complete();

      // THEN
      expect(optionProduitCommercesFormService.getOptionProduitCommerces).toHaveBeenCalled();
      expect(optionProduitCommercesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOptionProduitCommerces>>();
      const optionProduitCommerces = { id: 123 };
      jest.spyOn(optionProduitCommercesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ optionProduitCommerces });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(optionProduitCommercesService.update).toHaveBeenCalled();
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
