import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tarif-commercant.test-samples';

import { TarifCommercantFormService } from './tarif-commercant-form.service';

describe('TarifCommercant Form Service', () => {
  let service: TarifCommercantFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifCommercantFormService);
  });

  describe('Service methods', () => {
    describe('createTarifCommercantFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTarifCommercantFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            typeCommission: expect.any(Object),
            tarif: expect.any(Object),
            parametrage: expect.any(Object),
          }),
        );
      });

      it('passing ITarifCommercant should create a new form with FormGroup', () => {
        const formGroup = service.createTarifCommercantFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            typeCommission: expect.any(Object),
            tarif: expect.any(Object),
            parametrage: expect.any(Object),
          }),
        );
      });
    });

    describe('getTarifCommercant', () => {
      it('should return NewTarifCommercant for default TarifCommercant initial value', () => {
        const formGroup = service.createTarifCommercantFormGroup(sampleWithNewData);

        const tarifCommercant = service.getTarifCommercant(formGroup) as any;

        expect(tarifCommercant).toMatchObject(sampleWithNewData);
      });

      it('should return NewTarifCommercant for empty TarifCommercant initial value', () => {
        const formGroup = service.createTarifCommercantFormGroup();

        const tarifCommercant = service.getTarifCommercant(formGroup) as any;

        expect(tarifCommercant).toMatchObject({});
      });

      it('should return ITarifCommercant', () => {
        const formGroup = service.createTarifCommercantFormGroup(sampleWithRequiredData);

        const tarifCommercant = service.getTarifCommercant(formGroup) as any;

        expect(tarifCommercant).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITarifCommercant should not enable id FormControl', () => {
        const formGroup = service.createTarifCommercantFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTarifCommercant should disable id FormControl', () => {
        const formGroup = service.createTarifCommercantFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
