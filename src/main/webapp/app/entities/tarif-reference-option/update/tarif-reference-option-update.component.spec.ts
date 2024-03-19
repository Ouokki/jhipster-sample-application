import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IReferenceOptionProduitCommerces } from 'app/entities/reference-option-produit-commerces/reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesService } from 'app/entities/reference-option-produit-commerces/service/reference-option-produit-commerces.service';
import { TarifReferenceOptionService } from '../service/tarif-reference-option.service';
import { ITarifReferenceOption } from '../tarif-reference-option.model';
import { TarifReferenceOptionFormService } from './tarif-reference-option-form.service';

import { TarifReferenceOptionUpdateComponent } from './tarif-reference-option-update.component';

describe('TarifReferenceOption Management Update Component', () => {
  let comp: TarifReferenceOptionUpdateComponent;
  let fixture: ComponentFixture<TarifReferenceOptionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tarifReferenceOptionFormService: TarifReferenceOptionFormService;
  let tarifReferenceOptionService: TarifReferenceOptionService;
  let referenceOptionProduitCommercesService: ReferenceOptionProduitCommercesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TarifReferenceOptionUpdateComponent],
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
      .overrideTemplate(TarifReferenceOptionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifReferenceOptionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tarifReferenceOptionFormService = TestBed.inject(TarifReferenceOptionFormService);
    tarifReferenceOptionService = TestBed.inject(TarifReferenceOptionService);
    referenceOptionProduitCommercesService = TestBed.inject(ReferenceOptionProduitCommercesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ReferenceOptionProduitCommerces query and add missing value', () => {
      const tarifReferenceOption: ITarifReferenceOption = { id: 456 };
      const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces[] = [{ id: 8830 }];
      tarifReferenceOption.referenceOptionProduitCommerces = referenceOptionProduitCommerces;

      const referenceOptionProduitCommercesCollection: IReferenceOptionProduitCommerces[] = [{ id: 25699 }];
      jest
        .spyOn(referenceOptionProduitCommercesService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: referenceOptionProduitCommercesCollection })));
      const additionalReferenceOptionProduitCommerces = [...referenceOptionProduitCommerces];
      const expectedCollection: IReferenceOptionProduitCommerces[] = [
        ...additionalReferenceOptionProduitCommerces,
        ...referenceOptionProduitCommercesCollection,
      ];
      jest
        .spyOn(referenceOptionProduitCommercesService, 'addReferenceOptionProduitCommercesToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tarifReferenceOption });
      comp.ngOnInit();

      expect(referenceOptionProduitCommercesService.query).toHaveBeenCalled();
      expect(referenceOptionProduitCommercesService.addReferenceOptionProduitCommercesToCollectionIfMissing).toHaveBeenCalledWith(
        referenceOptionProduitCommercesCollection,
        ...additionalReferenceOptionProduitCommerces.map(expect.objectContaining),
      );
      expect(comp.referenceOptionProduitCommercesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tarifReferenceOption: ITarifReferenceOption = { id: 456 };
      const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = { id: 25596 };
      tarifReferenceOption.referenceOptionProduitCommerces = [referenceOptionProduitCommerces];

      activatedRoute.data = of({ tarifReferenceOption });
      comp.ngOnInit();

      expect(comp.referenceOptionProduitCommercesSharedCollection).toContain(referenceOptionProduitCommerces);
      expect(comp.tarifReferenceOption).toEqual(tarifReferenceOption);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifReferenceOption>>();
      const tarifReferenceOption = { id: 123 };
      jest.spyOn(tarifReferenceOptionFormService, 'getTarifReferenceOption').mockReturnValue(tarifReferenceOption);
      jest.spyOn(tarifReferenceOptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifReferenceOption });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifReferenceOption }));
      saveSubject.complete();

      // THEN
      expect(tarifReferenceOptionFormService.getTarifReferenceOption).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tarifReferenceOptionService.update).toHaveBeenCalledWith(expect.objectContaining(tarifReferenceOption));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifReferenceOption>>();
      const tarifReferenceOption = { id: 123 };
      jest.spyOn(tarifReferenceOptionFormService, 'getTarifReferenceOption').mockReturnValue({ id: null });
      jest.spyOn(tarifReferenceOptionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifReferenceOption: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tarifReferenceOption }));
      saveSubject.complete();

      // THEN
      expect(tarifReferenceOptionFormService.getTarifReferenceOption).toHaveBeenCalled();
      expect(tarifReferenceOptionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITarifReferenceOption>>();
      const tarifReferenceOption = { id: 123 };
      jest.spyOn(tarifReferenceOptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tarifReferenceOption });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tarifReferenceOptionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareReferenceOptionProduitCommerces', () => {
      it('Should forward to referenceOptionProduitCommercesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(referenceOptionProduitCommercesService, 'compareReferenceOptionProduitCommerces');
        comp.compareReferenceOptionProduitCommerces(entity, entity2);
        expect(referenceOptionProduitCommercesService.compareReferenceOptionProduitCommerces).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
