import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fdo.test-samples';

import { FdoFormService } from './fdo-form.service';

describe('Fdo Form Service', () => {
  let service: FdoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdoFormService);
  });

  describe('Service methods', () => {
    describe('createFdoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFdoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });

      it('passing IFdo should create a new form with FormGroup', () => {
        const formGroup = service.createFdoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });
    });

    describe('getFdo', () => {
      it('should return NewFdo for default Fdo initial value', () => {
        const formGroup = service.createFdoFormGroup(sampleWithNewData);

        const fdo = service.getFdo(formGroup) as any;

        expect(fdo).toMatchObject(sampleWithNewData);
      });

      it('should return NewFdo for empty Fdo initial value', () => {
        const formGroup = service.createFdoFormGroup();

        const fdo = service.getFdo(formGroup) as any;

        expect(fdo).toMatchObject({});
      });

      it('should return IFdo', () => {
        const formGroup = service.createFdoFormGroup(sampleWithRequiredData);

        const fdo = service.getFdo(formGroup) as any;

        expect(fdo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFdo should not enable id FormControl', () => {
        const formGroup = service.createFdoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFdo should disable id FormControl', () => {
        const formGroup = service.createFdoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
