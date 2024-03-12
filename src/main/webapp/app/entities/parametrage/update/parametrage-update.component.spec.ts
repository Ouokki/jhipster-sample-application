import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IGarantie } from 'app/entities/garantie/garantie.model';
import { GarantieService } from 'app/entities/garantie/service/garantie.service';
import { IDemande } from 'app/entities/demande/demande.model';
import { DemandeService } from 'app/entities/demande/service/demande.service';
import { ITarifCommercant } from 'app/entities/tarif-commercant/tarif-commercant.model';
import { TarifCommercantService } from 'app/entities/tarif-commercant/service/tarif-commercant.service';
import { IOptionProduitCommerces } from 'app/entities/option-produit-commerces/option-produit-commerces.model';
import { OptionProduitCommercesService } from 'app/entities/option-produit-commerces/service/option-produit-commerces.service';
import { IConformite } from 'app/entities/conformite/conformite.model';
import { ConformiteService } from 'app/entities/conformite/service/conformite.service';
import { IParametrage } from '../parametrage.model';
import { ParametrageService } from '../service/parametrage.service';
import { ParametrageFormService } from './parametrage-form.service';

import { ParametrageUpdateComponent } from './parametrage-update.component';

describe('Parametrage Management Update Component', () => {
  let comp: ParametrageUpdateComponent;
  let fixture: ComponentFixture<ParametrageUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let parametrageFormService: ParametrageFormService;
  let parametrageService: ParametrageService;
  let garantieService: GarantieService;
  let demandeService: DemandeService;
  let tarifCommercantService: TarifCommercantService;
  let optionProduitCommercesService: OptionProduitCommercesService;
  let conformiteService: ConformiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ParametrageUpdateComponent],
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
      .overrideTemplate(ParametrageUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ParametrageUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parametrageFormService = TestBed.inject(ParametrageFormService);
    parametrageService = TestBed.inject(ParametrageService);
    garantieService = TestBed.inject(GarantieService);
    demandeService = TestBed.inject(DemandeService);
    tarifCommercantService = TestBed.inject(TarifCommercantService);
    optionProduitCommercesService = TestBed.inject(OptionProduitCommercesService);
    conformiteService = TestBed.inject(ConformiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call garantie query and add missing value', () => {
      const parametrage: IParametrage = { id: 456 };
      const garantie: IGarantie = { id: 5799 };
      parametrage.garantie = garantie;

      const garantieCollection: IGarantie[] = [{ id: 4660 }];
      jest.spyOn(garantieService, 'query').mockReturnValue(of(new HttpResponse({ body: garantieCollection })));
      const expectedCollection: IGarantie[] = [garantie, ...garantieCollection];
      jest.spyOn(garantieService, 'addGarantieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      expect(garantieService.query).toHaveBeenCalled();
      expect(garantieService.addGarantieToCollectionIfMissing).toHaveBeenCalledWith(garantieCollection, garantie);
      expect(comp.garantiesCollection).toEqual(expectedCollection);
    });

    it('Should call Demande query and add missing value', () => {
      const parametrage: IParametrage = { id: 456 };
      const demande: IDemande = { id: 28858 };
      parametrage.demande = demande;

      const demandeCollection: IDemande[] = [{ id: 27747 }];
      jest.spyOn(demandeService, 'query').mockReturnValue(of(new HttpResponse({ body: demandeCollection })));
      const additionalDemandes = [demande];
      const expectedCollection: IDemande[] = [...additionalDemandes, ...demandeCollection];
      jest.spyOn(demandeService, 'addDemandeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      expect(demandeService.query).toHaveBeenCalled();
      expect(demandeService.addDemandeToCollectionIfMissing).toHaveBeenCalledWith(
        demandeCollection,
        ...additionalDemandes.map(expect.objectContaining),
      );
      expect(comp.demandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TarifCommercant query and add missing value', () => {
      const parametrage: IParametrage = { id: 456 };
      const tarifCommercant: ITarifCommercant = { id: 7892 };
      parametrage.tarifCommercant = tarifCommercant;

      const tarifCommercantCollection: ITarifCommercant[] = [{ id: 24114 }];
      jest.spyOn(tarifCommercantService, 'query').mockReturnValue(of(new HttpResponse({ body: tarifCommercantCollection })));
      const additionalTarifCommercants = [tarifCommercant];
      const expectedCollection: ITarifCommercant[] = [...additionalTarifCommercants, ...tarifCommercantCollection];
      jest.spyOn(tarifCommercantService, 'addTarifCommercantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      expect(tarifCommercantService.query).toHaveBeenCalled();
      expect(tarifCommercantService.addTarifCommercantToCollectionIfMissing).toHaveBeenCalledWith(
        tarifCommercantCollection,
        ...additionalTarifCommercants.map(expect.objectContaining),
      );
      expect(comp.tarifCommercantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call OptionProduitCommerces query and add missing value', () => {
      const parametrage: IParametrage = { id: 456 };
      const optionProduitCommerces: IOptionProduitCommerces = { id: 5714 };
      parametrage.optionProduitCommerces = optionProduitCommerces;

      const optionProduitCommercesCollection: IOptionProduitCommerces[] = [{ id: 7122 }];
      jest.spyOn(optionProduitCommercesService, 'query').mockReturnValue(of(new HttpResponse({ body: optionProduitCommercesCollection })));
      const additionalOptionProduitCommerces = [optionProduitCommerces];
      const expectedCollection: IOptionProduitCommerces[] = [...additionalOptionProduitCommerces, ...optionProduitCommercesCollection];
      jest.spyOn(optionProduitCommercesService, 'addOptionProduitCommercesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      expect(optionProduitCommercesService.query).toHaveBeenCalled();
      expect(optionProduitCommercesService.addOptionProduitCommercesToCollectionIfMissing).toHaveBeenCalledWith(
        optionProduitCommercesCollection,
        ...additionalOptionProduitCommerces.map(expect.objectContaining),
      );
      expect(comp.optionProduitCommercesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Conformite query and add missing value', () => {
      const parametrage: IParametrage = { id: 456 };
      const conformite: IConformite = { id: 18668 };
      parametrage.conformite = conformite;

      const conformiteCollection: IConformite[] = [{ id: 13010 }];
      jest.spyOn(conformiteService, 'query').mockReturnValue(of(new HttpResponse({ body: conformiteCollection })));
      const additionalConformites = [conformite];
      const expectedCollection: IConformite[] = [...additionalConformites, ...conformiteCollection];
      jest.spyOn(conformiteService, 'addConformiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      expect(conformiteService.query).toHaveBeenCalled();
      expect(conformiteService.addConformiteToCollectionIfMissing).toHaveBeenCalledWith(
        conformiteCollection,
        ...additionalConformites.map(expect.objectContaining),
      );
      expect(comp.conformitesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const parametrage: IParametrage = { id: 456 };
      const garantie: IGarantie = { id: 18184 };
      parametrage.garantie = garantie;
      const demande: IDemande = { id: 6705 };
      parametrage.demande = demande;
      const tarifCommercant: ITarifCommercant = { id: 4834 };
      parametrage.tarifCommercant = tarifCommercant;
      const optionProduitCommerces: IOptionProduitCommerces = { id: 14879 };
      parametrage.optionProduitCommerces = optionProduitCommerces;
      const conformite: IConformite = { id: 30220 };
      parametrage.conformite = conformite;

      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      expect(comp.garantiesCollection).toContain(garantie);
      expect(comp.demandesSharedCollection).toContain(demande);
      expect(comp.tarifCommercantsSharedCollection).toContain(tarifCommercant);
      expect(comp.optionProduitCommercesSharedCollection).toContain(optionProduitCommerces);
      expect(comp.conformitesSharedCollection).toContain(conformite);
      expect(comp.parametrage).toEqual(parametrage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParametrage>>();
      const parametrage = { id: 123 };
      jest.spyOn(parametrageFormService, 'getParametrage').mockReturnValue(parametrage);
      jest.spyOn(parametrageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parametrage }));
      saveSubject.complete();

      // THEN
      expect(parametrageFormService.getParametrage).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(parametrageService.update).toHaveBeenCalledWith(expect.objectContaining(parametrage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParametrage>>();
      const parametrage = { id: 123 };
      jest.spyOn(parametrageFormService, 'getParametrage').mockReturnValue({ id: null });
      jest.spyOn(parametrageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametrage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: parametrage }));
      saveSubject.complete();

      // THEN
      expect(parametrageFormService.getParametrage).toHaveBeenCalled();
      expect(parametrageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IParametrage>>();
      const parametrage = { id: 123 };
      jest.spyOn(parametrageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametrage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parametrageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareGarantie', () => {
      it('Should forward to garantieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(garantieService, 'compareGarantie');
        comp.compareGarantie(entity, entity2);
        expect(garantieService.compareGarantie).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDemande', () => {
      it('Should forward to demandeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(demandeService, 'compareDemande');
        comp.compareDemande(entity, entity2);
        expect(demandeService.compareDemande).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTarifCommercant', () => {
      it('Should forward to tarifCommercantService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tarifCommercantService, 'compareTarifCommercant');
        comp.compareTarifCommercant(entity, entity2);
        expect(tarifCommercantService.compareTarifCommercant).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOptionProduitCommerces', () => {
      it('Should forward to optionProduitCommercesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(optionProduitCommercesService, 'compareOptionProduitCommerces');
        comp.compareOptionProduitCommerces(entity, entity2);
        expect(optionProduitCommercesService.compareOptionProduitCommerces).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareConformite', () => {
      it('Should forward to conformiteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(conformiteService, 'compareConformite');
        comp.compareConformite(entity, entity2);
        expect(conformiteService.compareConformite).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
