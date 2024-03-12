import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cr.test-samples';

import { CRFormService } from './cr-form.service';

describe('CR Form Service', () => {
  let service: CRFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRFormService);
  });

  describe('Service methods', () => {
    describe('createCRFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCRFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isAvem: expect.any(Object),
            isAmex: expect.any(Object),
          }),
        );
      });

      it('passing ICR should create a new form with FormGroup', () => {
        const formGroup = service.createCRFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isAvem: expect.any(Object),
            isAmex: expect.any(Object),
          }),
        );
      });
    });

    describe('getCR', () => {
      it('should return NewCR for default CR initial value', () => {
        const formGroup = service.createCRFormGroup(sampleWithNewData);

        const cR = service.getCR(formGroup) as any;

        expect(cR).toMatchObject(sampleWithNewData);
      });

      it('should return NewCR for empty CR initial value', () => {
        const formGroup = service.createCRFormGroup();

        const cR = service.getCR(formGroup) as any;

        expect(cR).toMatchObject({});
      });

      it('should return ICR', () => {
        const formGroup = service.createCRFormGroup(sampleWithRequiredData);

        const cR = service.getCR(formGroup) as any;

        expect(cR).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICR should not enable id FormControl', () => {
        const formGroup = service.createCRFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCR should disable id FormControl', () => {
        const formGroup = service.createCRFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
