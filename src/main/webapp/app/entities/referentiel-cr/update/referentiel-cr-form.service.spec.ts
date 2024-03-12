import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../referentiel-cr.test-samples';

import { ReferentielCRFormService } from './referentiel-cr-form.service';

describe('ReferentielCR Form Service', () => {
  let service: ReferentielCRFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferentielCRFormService);
  });

  describe('Service methods', () => {
    describe('createReferentielCRFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createReferentielCRFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomCR: expect.any(Object),
            numeroCR: expect.any(Object),
            cr: expect.any(Object),
          }),
        );
      });

      it('passing IReferentielCR should create a new form with FormGroup', () => {
        const formGroup = service.createReferentielCRFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nomCR: expect.any(Object),
            numeroCR: expect.any(Object),
            cr: expect.any(Object),
          }),
        );
      });
    });

    describe('getReferentielCR', () => {
      it('should return NewReferentielCR for default ReferentielCR initial value', () => {
        const formGroup = service.createReferentielCRFormGroup(sampleWithNewData);

        const referentielCR = service.getReferentielCR(formGroup) as any;

        expect(referentielCR).toMatchObject(sampleWithNewData);
      });

      it('should return NewReferentielCR for empty ReferentielCR initial value', () => {
        const formGroup = service.createReferentielCRFormGroup();

        const referentielCR = service.getReferentielCR(formGroup) as any;

        expect(referentielCR).toMatchObject({});
      });

      it('should return IReferentielCR', () => {
        const formGroup = service.createReferentielCRFormGroup(sampleWithRequiredData);

        const referentielCR = service.getReferentielCR(formGroup) as any;

        expect(referentielCR).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IReferentielCR should not enable id FormControl', () => {
        const formGroup = service.createReferentielCRFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewReferentielCR should disable id FormControl', () => {
        const formGroup = service.createReferentielCRFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
