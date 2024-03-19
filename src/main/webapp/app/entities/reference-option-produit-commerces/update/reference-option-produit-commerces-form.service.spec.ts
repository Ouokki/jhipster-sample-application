import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../reference-option-produit-commerces.test-samples';

import { ReferenceOptionProduitCommercesFormService } from './reference-option-produit-commerces-form.service';

describe('ReferenceOptionProduitCommerces Form Service', () => {
  let service: ReferenceOptionProduitCommercesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceOptionProduitCommercesFormService);
  });

  describe('Service methods', () => {
    describe('createReferenceOptionProduitCommercesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeOptionProduit: expect.any(Object),
            libelleOptionProduit: expect.any(Object),
          }),
        );
      });

      it('passing IReferenceOptionProduitCommerces should create a new form with FormGroup', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeOptionProduit: expect.any(Object),
            libelleOptionProduit: expect.any(Object),
          }),
        );
      });
    });

    describe('getReferenceOptionProduitCommerces', () => {
      it('should return NewReferenceOptionProduitCommerces for default ReferenceOptionProduitCommerces initial value', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup(sampleWithNewData);

        const referenceOptionProduitCommerces = service.getReferenceOptionProduitCommerces(formGroup) as any;

        expect(referenceOptionProduitCommerces).toMatchObject(sampleWithNewData);
      });

      it('should return NewReferenceOptionProduitCommerces for empty ReferenceOptionProduitCommerces initial value', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup();

        const referenceOptionProduitCommerces = service.getReferenceOptionProduitCommerces(formGroup) as any;

        expect(referenceOptionProduitCommerces).toMatchObject({});
      });

      it('should return IReferenceOptionProduitCommerces', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup(sampleWithRequiredData);

        const referenceOptionProduitCommerces = service.getReferenceOptionProduitCommerces(formGroup) as any;

        expect(referenceOptionProduitCommerces).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReferenceOptionProduitCommerces should not enable id FormControl', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReferenceOptionProduitCommerces should disable id FormControl', () => {
        const formGroup = service.createReferenceOptionProduitCommercesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
