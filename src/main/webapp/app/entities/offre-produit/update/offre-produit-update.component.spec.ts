import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
import { ICR } from 'app/entities/cr/cr.model';
import { CRService } from 'app/entities/cr/service/cr.service';
import { IOffre } from 'app/entities/offre/offre.model';
import { OffreService } from 'app/entities/offre/service/offre.service';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';
import { IOffreProduit } from '../offre-produit.model';
import { OffreProduitService } from '../service/offre-produit.service';
import { OffreProduitFormService } from './offre-produit-form.service';

import { OffreProduitUpdateComponent } from './offre-produit-update.component';

describe('OffreProduit Management Update Component', () => {
  let comp: OffreProduitUpdateComponent;
  let fixture: ComponentFixture<OffreProduitUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let offreProduitFormService: OffreProduitFormService;
  let offreProduitService: OffreProduitService;
  let parametrageService: ParametrageService;
  let cRService: CRService;
  let offreService: OffreService;
  let produitService: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OffreProduitUpdateComponent],
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
      .overrideTemplate(OffreProduitUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OffreProduitUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    offreProduitFormService = TestBed.inject(OffreProduitFormService);
    offreProduitService = TestBed.inject(OffreProduitService);
    parametrageService = TestBed.inject(ParametrageService);
    cRService = TestBed.inject(CRService);
    offreService = TestBed.inject(OffreService);
    produitService = TestBed.inject(ProduitService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call parametrage query and add missing value', () => {
      const offreProduit: IOffreProduit = { id: 456 };
      const parametrage: IParametrage = { id: 27756 };
      offreProduit.parametrage = parametrage;

      const parametrageCollection: IParametrage[] = [{ id: 1174 }];
      jest.spyOn(parametrageService, 'query').mockReturnValue(of(new HttpResponse({ body: parametrageCollection })));
      const expectedCollection: IParametrage[] = [parametrage, ...parametrageCollection];
      jest.spyOn(parametrageService, 'addParametrageToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      expect(parametrageService.query).toHaveBeenCalled();
      expect(parametrageService.addParametrageToCollectionIfMissing).toHaveBeenCalledWith(parametrageCollection, parametrage);
      expect(comp.parametragesCollection).toEqual(expectedCollection);
    });

    it('Should call CR query and add missing value', () => {
      const offreProduit: IOffreProduit = { id: 456 };
      const cr: ICR = { id: 27204 };
      offreProduit.cr = cr;

      const cRCollection: ICR[] = [{ id: 25020 }];
      jest.spyOn(cRService, 'query').mockReturnValue(of(new HttpResponse({ body: cRCollection })));
      const additionalCRS = [cr];
      const expectedCollection: ICR[] = [...additionalCRS, ...cRCollection];
      jest.spyOn(cRService, 'addCRToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      expect(cRService.query).toHaveBeenCalled();
      expect(cRService.addCRToCollectionIfMissing).toHaveBeenCalledWith(cRCollection, ...additionalCRS.map(expect.objectContaining));
      expect(comp.cRSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Offre query and add missing value', () => {
      const offreProduit: IOffreProduit = { id: 456 };
      const offres: IOffre[] = [{ id: 23822 }];
      offreProduit.offres = offres;

      const offreCollection: IOffre[] = [{ id: 31105 }];
      jest.spyOn(offreService, 'query').mockReturnValue(of(new HttpResponse({ body: offreCollection })));
      const additionalOffres = [...offres];
      const expectedCollection: IOffre[] = [...additionalOffres, ...offreCollection];
      jest.spyOn(offreService, 'addOffreToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      expect(offreService.query).toHaveBeenCalled();
      expect(offreService.addOffreToCollectionIfMissing).toHaveBeenCalledWith(
        offreCollection,
        ...additionalOffres.map(expect.objectContaining),
      );
      expect(comp.offresSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Produit query and add missing value', () => {
      const offreProduit: IOffreProduit = { id: 456 };
      const produits: IProduit[] = [{ id: 16366 }];
      offreProduit.produits = produits;

      const produitCollection: IProduit[] = [{ id: 11361 }];
      jest.spyOn(produitService, 'query').mockReturnValue(of(new HttpResponse({ body: produitCollection })));
      const additionalProduits = [...produits];
      const expectedCollection: IProduit[] = [...additionalProduits, ...produitCollection];
      jest.spyOn(produitService, 'addProduitToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      expect(produitService.query).toHaveBeenCalled();
      expect(produitService.addProduitToCollectionIfMissing).toHaveBeenCalledWith(
        produitCollection,
        ...additionalProduits.map(expect.objectContaining),
      );
      expect(comp.produitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const offreProduit: IOffreProduit = { id: 456 };
      const parametrage: IParametrage = { id: 5811 };
      offreProduit.parametrage = parametrage;
      const cr: ICR = { id: 6273 };
      offreProduit.cr = cr;
      const offre: IOffre = { id: 4161 };
      offreProduit.offres = [offre];
      const produit: IProduit = { id: 32506 };
      offreProduit.produits = [produit];

      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      expect(comp.parametragesCollection).toContain(parametrage);
      expect(comp.cRSSharedCollection).toContain(cr);
      expect(comp.offresSharedCollection).toContain(offre);
      expect(comp.produitsSharedCollection).toContain(produit);
      expect(comp.offreProduit).toEqual(offreProduit);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOffreProduit>>();
      const offreProduit = { id: 123 };
      jest.spyOn(offreProduitFormService, 'getOffreProduit').mockReturnValue(offreProduit);
      jest.spyOn(offreProduitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: offreProduit }));
      saveSubject.complete();

      // THEN
      expect(offreProduitFormService.getOffreProduit).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(offreProduitService.update).toHaveBeenCalledWith(expect.objectContaining(offreProduit));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOffreProduit>>();
      const offreProduit = { id: 123 };
      jest.spyOn(offreProduitFormService, 'getOffreProduit').mockReturnValue({ id: null });
      jest.spyOn(offreProduitService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ offreProduit: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: offreProduit }));
      saveSubject.complete();

      // THEN
      expect(offreProduitFormService.getOffreProduit).toHaveBeenCalled();
      expect(offreProduitService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOffreProduit>>();
      const offreProduit = { id: 123 };
      jest.spyOn(offreProduitService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ offreProduit });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(offreProduitService.update).toHaveBeenCalled();
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

    describe('compareCR', () => {
      it('Should forward to cRService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cRService, 'compareCR');
        comp.compareCR(entity, entity2);
        expect(cRService.compareCR).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOffre', () => {
      it('Should forward to offreService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(offreService, 'compareOffre');
        comp.compareOffre(entity, entity2);
        expect(offreService.compareOffre).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduit', () => {
      it('Should forward to produitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(produitService, 'compareProduit');
        comp.compareProduit(entity, entity2);
        expect(produitService.compareProduit).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
