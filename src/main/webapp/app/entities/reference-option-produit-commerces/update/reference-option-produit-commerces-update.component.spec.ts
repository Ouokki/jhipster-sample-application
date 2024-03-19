import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ReferenceOptionProduitCommercesService } from '../service/reference-option-produit-commerces.service';
import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesFormService } from './reference-option-produit-commerces-form.service';

import { ReferenceOptionProduitCommercesUpdateComponent } from './reference-option-produit-commerces-update.component';

describe('ReferenceOptionProduitCommerces Management Update Component', () => {
  let comp: ReferenceOptionProduitCommercesUpdateComponent;
  let fixture: ComponentFixture<ReferenceOptionProduitCommercesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let referenceOptionProduitCommercesFormService: ReferenceOptionProduitCommercesFormService;
  let referenceOptionProduitCommercesService: ReferenceOptionProduitCommercesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ReferenceOptionProduitCommercesUpdateComponent],
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
      .overrideTemplate(ReferenceOptionProduitCommercesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReferenceOptionProduitCommercesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    referenceOptionProduitCommercesFormService = TestBed.inject(ReferenceOptionProduitCommercesFormService);
    referenceOptionProduitCommercesService = TestBed.inject(ReferenceOptionProduitCommercesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = { id: 456 };

      activatedRoute.data = of({ referenceOptionProduitCommerces });
      comp.ngOnInit();

      expect(comp.referenceOptionProduitCommerces).toEqual(referenceOptionProduitCommerces);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReferenceOptionProduitCommerces>>();
      const referenceOptionProduitCommerces = { id: 123 };
      jest
        .spyOn(referenceOptionProduitCommercesFormService, 'getReferenceOptionProduitCommerces')
        .mockReturnValue(referenceOptionProduitCommerces);
      jest.spyOn(referenceOptionProduitCommercesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ referenceOptionProduitCommerces });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: referenceOptionProduitCommerces }));
      saveSubject.complete();

      // THEN
      expect(referenceOptionProduitCommercesFormService.getReferenceOptionProduitCommerces).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(referenceOptionProduitCommercesService.update).toHaveBeenCalledWith(expect.objectContaining(referenceOptionProduitCommerces));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReferenceOptionProduitCommerces>>();
      const referenceOptionProduitCommerces = { id: 123 };
      jest.spyOn(referenceOptionProduitCommercesFormService, 'getReferenceOptionProduitCommerces').mockReturnValue({ id: null });
      jest.spyOn(referenceOptionProduitCommercesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ referenceOptionProduitCommerces: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: referenceOptionProduitCommerces }));
      saveSubject.complete();

      // THEN
      expect(referenceOptionProduitCommercesFormService.getReferenceOptionProduitCommerces).toHaveBeenCalled();
      expect(referenceOptionProduitCommercesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReferenceOptionProduitCommerces>>();
      const referenceOptionProduitCommerces = { id: 123 };
      jest.spyOn(referenceOptionProduitCommercesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ referenceOptionProduitCommerces });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(referenceOptionProduitCommercesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
