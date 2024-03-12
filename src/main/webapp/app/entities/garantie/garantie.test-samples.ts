import { IGarantie, NewGarantie } from './garantie.model';

export const sampleWithRequiredData: IGarantie = {
  id: 30965,
};

export const sampleWithPartialData: IGarantie = {
  id: 28435,
  montantAutorisationTPE: 'mmm',
  delaiRemise: 'ouch cuddly',
  delaiCommunicationJustificatif: 'enraged',
};

export const sampleWithFullData: IGarantie = {
  id: 10554,
  montantAutorisationTransaction: 'ultimate',
  montantAutorisationTPE: 'clavicle',
  delaiRemise: 'positively',
  delaiCommunicationJustificatif: 'ouch',
};

export const sampleWithNewData: NewGarantie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
