import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tarif-reference-option.test-samples';

import { TarifReferenceOptionFormService } from './tarif-reference-option-form.service';

describe('TarifReferenceOption Form Service', () => {
  let service: TarifReferenceOptionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifReferenceOptionFormService);
  });

  describe('Service methods', () => {
    describe('createTarifReferenceOptionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trigramme: expect.any(Object),
            referenceOptionProduitCommerces: expect.any(Object),
          }),
        );
      });

      it('passing ITarifReferenceOption should create a new form with FormGroup', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trigramme: expect.any(Object),
            referenceOptionProduitCommerces: expect.any(Object),
          }),
        );
      });
    });

    describe('getTarifReferenceOption', () => {
      it('should return NewTarifReferenceOption for default TarifReferenceOption initial value', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup(sampleWithNewData);

        const tarifReferenceOption = service.getTarifReferenceOption(formGroup) as any;

        expect(tarifReferenceOption).toMatchObject(sampleWithNewData);
      });

      it('should return NewTarifReferenceOption for empty TarifReferenceOption initial value', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup();

        const tarifReferenceOption = service.getTarifReferenceOption(formGroup) as any;

        expect(tarifReferenceOption).toMatchObject({});
      });

      it('should return ITarifReferenceOption', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup(sampleWithRequiredData);

        const tarifReferenceOption = service.getTarifReferenceOption(formGroup) as any;

        expect(tarifReferenceOption).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITarifReferenceOption should not enable id FormControl', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTarifReferenceOption should disable id FormControl', () => {
        const formGroup = service.createTarifReferenceOptionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
