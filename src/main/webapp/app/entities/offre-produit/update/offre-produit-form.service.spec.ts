import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../offre-produit.test-samples';

import { OffreProduitFormService } from './offre-produit-form.service';

describe('OffreProduit Form Service', () => {
  let service: OffreProduitFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreProduitFormService);
  });

  describe('Service methods', () => {
    describe('createOffreProduitFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOffreProduitFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activeProd: expect.any(Object),
            activeNEHOM: expect.any(Object),
            activeVMOA: expect.any(Object),
            activeDEVTU: expect.any(Object),
            parametrage: expect.any(Object),
            offres: expect.any(Object),
            produits: expect.any(Object),
          }),
        );
      });

      it('passing IOffreProduit should create a new form with FormGroup', () => {
        const formGroup = service.createOffreProduitFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            activeProd: expect.any(Object),
            activeNEHOM: expect.any(Object),
            activeVMOA: expect.any(Object),
            activeDEVTU: expect.any(Object),
            parametrage: expect.any(Object),
            offres: expect.any(Object),
            produits: expect.any(Object),
          }),
        );
      });
    });

    describe('getOffreProduit', () => {
      it('should return NewOffreProduit for default OffreProduit initial value', () => {
        const formGroup = service.createOffreProduitFormGroup(sampleWithNewData);

        const offreProduit = service.getOffreProduit(formGroup) as any;

        expect(offreProduit).toMatchObject(sampleWithNewData);
      });

      it('should return NewOffreProduit for empty OffreProduit initial value', () => {
        const formGroup = service.createOffreProduitFormGroup();

        const offreProduit = service.getOffreProduit(formGroup) as any;

        expect(offreProduit).toMatchObject({});
      });

      it('should return IOffreProduit', () => {
        const formGroup = service.createOffreProduitFormGroup(sampleWithRequiredData);

        const offreProduit = service.getOffreProduit(formGroup) as any;

        expect(offreProduit).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOffreProduit should not enable id FormControl', () => {
        const formGroup = service.createOffreProduitFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOffreProduit should disable id FormControl', () => {
        const formGroup = service.createOffreProduitFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
