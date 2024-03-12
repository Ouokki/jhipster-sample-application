import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IReferentielCR } from 'app/entities/referentiel-cr/referentiel-cr.model';
import { ReferentielCRService } from 'app/entities/referentiel-cr/service/referentiel-cr.service';
import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';
import { OffreProduitService } from 'app/entities/offre-produit/service/offre-produit.service';
import { ICR } from '../cr.model';
import { CRService } from '../service/cr.service';
import { CRFormService } from './cr-form.service';

import { CRUpdateComponent } from './cr-update.component';

describe('CR Management Update Component', () => {
  let comp: CRUpdateComponent;
  let fixture: ComponentFixture<CRUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cRFormService: CRFormService;
  let cRService: CRService;
  let referentielCRService: ReferentielCRService;
  let offreProduitService: OffreProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CRUpdateComponent],
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
      .overrideTemplate(CRUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CRUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cRFormService = TestBed.inject(CRFormService);
    cRService = TestBed.inject(CRService);
    referentielCRService = TestBed.inject(ReferentielCRService);
    offreProduitService = TestBed.inject(OffreProduitService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ReferentielCR query and add missing value', () => {
      const cR: ICR = { id: 456 };
      const referentielCR: IReferentielCR = { id: 21368 };
      cR.referentielCR = referentielCR;

      const referentielCRCollection: IReferentielCR[] = [{ id: 20176 }];
      jest.spyOn(referentielCRService, 'query').mockReturnValue(of(new HttpResponse({ body: referentielCRCollection })));
      const additionalReferentielCRS = [referentielCR];
      const expectedCollection: IReferentielCR[] = [...additionalReferentielCRS, ...referentielCRCollection];
      jest.spyOn(referentielCRService, 'addReferentielCRToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      expect(referentielCRService.query).toHaveBeenCalled();
      expect(referentielCRService.addReferentielCRToCollectionIfMissing).toHaveBeenCalledWith(
        referentielCRCollection,
        ...additionalReferentielCRS.map(expect.objectContaining),
      );
      expect(comp.referentielCRSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call OffreProduit query and add missing value', () => {
      const cR: ICR = { id: 456 };
      const offreProduit: IOffreProduit = { id: 8531 };
      cR.offreProduit = offreProduit;

      const offreProduitCollection: IOffreProduit[] = [{ id: 904 }];
      jest.spyOn(offreProduitService, 'query').mockReturnValue(of(new HttpResponse({ body: offreProduitCollection })));
      const additionalOffreProduits = [offreProduit];
      const expectedCollection: IOffreProduit[] = [...additionalOffreProduits, ...offreProduitCollection];
      jest.spyOn(offreProduitService, 'addOffreProduitToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      expect(offreProduitService.query).toHaveBeenCalled();
      expect(offreProduitService.addOffreProduitToCollectionIfMissing).toHaveBeenCalledWith(
        offreProduitCollection,
        ...additionalOffreProduits.map(expect.objectContaining),
      );
      expect(comp.offreProduitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const cR: ICR = { id: 456 };
      const referentielCR: IReferentielCR = { id: 32668 };
      cR.referentielCR = referentielCR;
      const offreProduit: IOffreProduit = { id: 28959 };
      cR.offreProduit = offreProduit;

      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      expect(comp.referentielCRSSharedCollection).toContain(referentielCR);
      expect(comp.offreProduitsSharedCollection).toContain(offreProduit);
      expect(comp.cR).toEqual(cR);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICR>>();
      const cR = { id: 123 };
      jest.spyOn(cRFormService, 'getCR').mockReturnValue(cR);
      jest.spyOn(cRService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cR }));
      saveSubject.complete();

      // THEN
      expect(cRFormService.getCR).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cRService.update).toHaveBeenCalledWith(expect.objectContaining(cR));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICR>>();
      const cR = { id: 123 };
      jest.spyOn(cRFormService, 'getCR').mockReturnValue({ id: null });
      jest.spyOn(cRService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cR: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cR }));
      saveSubject.complete();

      // THEN
      expect(cRFormService.getCR).toHaveBeenCalled();
      expect(cRService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICR>>();
      const cR = { id: 123 };
      jest.spyOn(cRService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cRService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareReferentielCR', () => {
      it('Should forward to referentielCRService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(referentielCRService, 'compareReferentielCR');
        comp.compareReferentielCR(entity, entity2);
        expect(referentielCRService.compareReferentielCR).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOffreProduit', () => {
      it('Should forward to offreProduitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(offreProduitService, 'compareOffreProduit');
        comp.compareOffreProduit(entity, entity2);
        expect(offreProduitService.compareOffreProduit).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
