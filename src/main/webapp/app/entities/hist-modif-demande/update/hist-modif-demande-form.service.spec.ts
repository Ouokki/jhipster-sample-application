import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../hist-modif-demande.test-samples';

import { HistModifDemandeFormService } from './hist-modif-demande-form.service';

describe('HistModifDemande Form Service', () => {
  let service: HistModifDemandeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistModifDemandeFormService);
  });

  describe('Service methods', () => {
    describe('createHistModifDemandeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHistModifDemandeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dateModification: expect.any(Object),
            typeModification: expect.any(Object),
            detailsModifications: expect.any(Object),
          }),
        );
      });

      it('passing IHistModifDemande should create a new form with FormGroup', () => {
        const formGroup = service.createHistModifDemandeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dateModification: expect.any(Object),
            typeModification: expect.any(Object),
            detailsModifications: expect.any(Object),
          }),
        );
      });
    });

    describe('getHistModifDemande', () => {
      it('should return NewHistModifDemande for default HistModifDemande initial value', () => {
        const formGroup = service.createHistModifDemandeFormGroup(sampleWithNewData);

        const histModifDemande = service.getHistModifDemande(formGroup) as any;

        expect(histModifDemande).toMatchObject(sampleWithNewData);
      });

      it('should return NewHistModifDemande for empty HistModifDemande initial value', () => {
        const formGroup = service.createHistModifDemandeFormGroup();

        const histModifDemande = service.getHistModifDemande(formGroup) as any;

        expect(histModifDemande).toMatchObject({});
      });

      it('should return IHistModifDemande', () => {
        const formGroup = service.createHistModifDemandeFormGroup(sampleWithRequiredData);

        const histModifDemande = service.getHistModifDemande(formGroup) as any;

        expect(histModifDemande).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHistModifDemande should not enable id FormControl', () => {
        const formGroup = service.createHistModifDemandeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHistModifDemande should disable id FormControl', () => {
        const formGroup = service.createHistModifDemandeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
