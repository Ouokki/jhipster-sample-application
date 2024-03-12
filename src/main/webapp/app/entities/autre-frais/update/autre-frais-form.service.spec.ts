import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../autre-frais.test-samples';

import { AutreFraisFormService } from './autre-frais-form.service';

describe('AutreFrais Form Service', () => {
  let service: AutreFraisFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutreFraisFormService);
  });

  describe('Service methods', () => {
    describe('createAutreFraisFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAutreFraisFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            domaineFrais: expect.any(Object),
          }),
        );
      });

      it('passing IAutreFrais should create a new form with FormGroup', () => {
        const formGroup = service.createAutreFraisFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            domaineFrais: expect.any(Object),
          }),
        );
      });
    });

    describe('getAutreFrais', () => {
      it('should return NewAutreFrais for default AutreFrais initial value', () => {
        const formGroup = service.createAutreFraisFormGroup(sampleWithNewData);

        const autreFrais = service.getAutreFrais(formGroup) as any;

        expect(autreFrais).toMatchObject(sampleWithNewData);
      });

      it('should return NewAutreFrais for empty AutreFrais initial value', () => {
        const formGroup = service.createAutreFraisFormGroup();

        const autreFrais = service.getAutreFrais(formGroup) as any;

        expect(autreFrais).toMatchObject({});
      });

      it('should return IAutreFrais', () => {
        const formGroup = service.createAutreFraisFormGroup(sampleWithRequiredData);

        const autreFrais = service.getAutreFrais(formGroup) as any;

        expect(autreFrais).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAutreFrais should not enable id FormControl', () => {
        const formGroup = service.createAutreFraisFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAutreFrais should disable id FormControl', () => {
        const formGroup = service.createAutreFraisFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
