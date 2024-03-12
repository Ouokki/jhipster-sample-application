import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../conformite.test-samples';

import { ConformiteFormService } from './conformite-form.service';

describe('Conformite Form Service', () => {
  let service: ConformiteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConformiteFormService);
  });

  describe('Service methods', () => {
    describe('createConformiteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConformiteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            affichage: expect.any(Object),
            lienBonita: expect.any(Object),
            parametrage: expect.any(Object),
          }),
        );
      });

      it('passing IConformite should create a new form with FormGroup', () => {
        const formGroup = service.createConformiteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            affichage: expect.any(Object),
            lienBonita: expect.any(Object),
            parametrage: expect.any(Object),
          }),
        );
      });
    });

    describe('getConformite', () => {
      it('should return NewConformite for default Conformite initial value', () => {
        const formGroup = service.createConformiteFormGroup(sampleWithNewData);

        const conformite = service.getConformite(formGroup) as any;

        expect(conformite).toMatchObject(sampleWithNewData);
      });

      it('should return NewConformite for empty Conformite initial value', () => {
        const formGroup = service.createConformiteFormGroup();

        const conformite = service.getConformite(formGroup) as any;

        expect(conformite).toMatchObject({});
      });

      it('should return IConformite', () => {
        const formGroup = service.createConformiteFormGroup(sampleWithRequiredData);

        const conformite = service.getConformite(formGroup) as any;

        expect(conformite).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConformite should not enable id FormControl', () => {
        const formGroup = service.createConformiteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConformite should disable id FormControl', () => {
        const formGroup = service.createConformiteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
