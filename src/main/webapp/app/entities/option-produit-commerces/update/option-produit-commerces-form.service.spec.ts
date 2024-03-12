import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../option-produit-commerces.test-samples';

import { OptionProduitCommercesFormService } from './option-produit-commerces-form.service';

describe('OptionProduitCommerces Form Service', () => {
  let service: OptionProduitCommercesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionProduitCommercesFormService);
  });

  describe('Service methods', () => {
    describe('createOptionProduitCommercesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tarifReferenceOption: expect.any(Object),
          }),
        );
      });

      it('passing IOptionProduitCommerces should create a new form with FormGroup', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tarifReferenceOption: expect.any(Object),
          }),
        );
      });
    });

    describe('getOptionProduitCommerces', () => {
      it('should return NewOptionProduitCommerces for default OptionProduitCommerces initial value', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup(sampleWithNewData);

        const optionProduitCommerces = service.getOptionProduitCommerces(formGroup) as any;

        expect(optionProduitCommerces).toMatchObject(sampleWithNewData);
      });

      it('should return NewOptionProduitCommerces for empty OptionProduitCommerces initial value', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup();

        const optionProduitCommerces = service.getOptionProduitCommerces(formGroup) as any;

        expect(optionProduitCommerces).toMatchObject({});
      });

      it('should return IOptionProduitCommerces', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup(sampleWithRequiredData);

        const optionProduitCommerces = service.getOptionProduitCommerces(formGroup) as any;

        expect(optionProduitCommerces).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOptionProduitCommerces should not enable id FormControl', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOptionProduitCommerces should disable id FormControl', () => {
        const formGroup = service.createOptionProduitCommercesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
