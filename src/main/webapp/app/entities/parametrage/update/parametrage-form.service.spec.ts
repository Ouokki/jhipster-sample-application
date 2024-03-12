import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../parametrage.test-samples';

import { ParametrageFormService } from './parametrage-form.service';

describe('Parametrage Form Service', () => {
  let service: ParametrageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrageFormService);
  });

  describe('Service methods', () => {
    describe('createParametrageFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createParametrageFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            garantie: expect.any(Object),
          }),
        );
      });

      it('passing IParametrage should create a new form with FormGroup', () => {
        const formGroup = service.createParametrageFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            garantie: expect.any(Object),
          }),
        );
      });
    });

    describe('getParametrage', () => {
      it('should return NewParametrage for default Parametrage initial value', () => {
        const formGroup = service.createParametrageFormGroup(sampleWithNewData);

        const parametrage = service.getParametrage(formGroup) as any;

        expect(parametrage).toMatchObject(sampleWithNewData);
      });

      it('should return NewParametrage for empty Parametrage initial value', () => {
        const formGroup = service.createParametrageFormGroup();

        const parametrage = service.getParametrage(formGroup) as any;

        expect(parametrage).toMatchObject({});
      });

      it('should return IParametrage', () => {
        const formGroup = service.createParametrageFormGroup(sampleWithRequiredData);

        const parametrage = service.getParametrage(formGroup) as any;

        expect(parametrage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IParametrage should not enable id FormControl', () => {
        const formGroup = service.createParametrageFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewParametrage should disable id FormControl', () => {
        const formGroup = service.createParametrageFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
