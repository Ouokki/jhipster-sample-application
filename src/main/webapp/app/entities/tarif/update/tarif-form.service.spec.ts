import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tarif.test-samples';

import { TarifFormService } from './tarif-form.service';

describe('Tarif Form Service', () => {
  let service: TarifFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifFormService);
  });

  describe('Service methods', () => {
    describe('createTarifFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTarifFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tarifParDefaut: expect.any(Object),
            tarifMinimum: expect.any(Object),
            tarifMaximum: expect.any(Object),
            unite: expect.any(Object),
          }),
        );
      });

      it('passing ITarif should create a new form with FormGroup', () => {
        const formGroup = service.createTarifFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tarifParDefaut: expect.any(Object),
            tarifMinimum: expect.any(Object),
            tarifMaximum: expect.any(Object),
            unite: expect.any(Object),
          }),
        );
      });
    });

    describe('getTarif', () => {
      it('should return NewTarif for default Tarif initial value', () => {
        const formGroup = service.createTarifFormGroup(sampleWithNewData);

        const tarif = service.getTarif(formGroup) as any;

        expect(tarif).toMatchObject(sampleWithNewData);
      });

      it('should return NewTarif for empty Tarif initial value', () => {
        const formGroup = service.createTarifFormGroup();

        const tarif = service.getTarif(formGroup) as any;

        expect(tarif).toMatchObject({});
      });

      it('should return ITarif', () => {
        const formGroup = service.createTarifFormGroup(sampleWithRequiredData);

        const tarif = service.getTarif(formGroup) as any;

        expect(tarif).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITarif should not enable id FormControl', () => {
        const formGroup = service.createTarifFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTarif should disable id FormControl', () => {
        const formGroup = service.createTarifFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
