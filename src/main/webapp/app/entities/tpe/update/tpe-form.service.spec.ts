import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tpe.test-samples';

import { TpeFormService } from './tpe-form.service';

describe('Tpe Form Service', () => {
  let service: TpeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpeFormService);
  });

  describe('Service methods', () => {
    describe('createTpeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTpeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            imageTpe: expect.any(Object),
            descriptif: expect.any(Object),
          }),
        );
      });

      it('passing ITpe should create a new form with FormGroup', () => {
        const formGroup = service.createTpeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            imageTpe: expect.any(Object),
            descriptif: expect.any(Object),
          }),
        );
      });
    });

    describe('getTpe', () => {
      it('should return NewTpe for default Tpe initial value', () => {
        const formGroup = service.createTpeFormGroup(sampleWithNewData);

        const tpe = service.getTpe(formGroup) as any;

        expect(tpe).toMatchObject(sampleWithNewData);
      });

      it('should return NewTpe for empty Tpe initial value', () => {
        const formGroup = service.createTpeFormGroup();

        const tpe = service.getTpe(formGroup) as any;

        expect(tpe).toMatchObject({});
      });

      it('should return ITpe', () => {
        const formGroup = service.createTpeFormGroup(sampleWithRequiredData);

        const tpe = service.getTpe(formGroup) as any;

        expect(tpe).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITpe should not enable id FormControl', () => {
        const formGroup = service.createTpeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTpe should disable id FormControl', () => {
        const formGroup = service.createTpeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
