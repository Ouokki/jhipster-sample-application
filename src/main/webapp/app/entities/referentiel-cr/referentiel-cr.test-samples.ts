import { IReferentielCR, NewReferentielCR } from './referentiel-cr.model';

export const sampleWithRequiredData: IReferentielCR = {
  id: 19607,
};

export const sampleWithPartialData: IReferentielCR = {
  id: 31770,
};

export const sampleWithFullData: IReferentielCR = {
  id: 13279,
  nomCR: 'zealous hip',
  numeroCR: 'toward truthfully',
};

export const sampleWithNewData: NewReferentielCR = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
