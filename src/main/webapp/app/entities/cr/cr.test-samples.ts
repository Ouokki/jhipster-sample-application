import { ICR, NewCR } from './cr.model';

export const sampleWithRequiredData: ICR = {
  id: 29199,
};

export const sampleWithPartialData: ICR = {
  id: 29214,
  isAvem: false,
};

export const sampleWithFullData: ICR = {
  id: 10782,
  isAvem: true,
  isAmex: true,
};

export const sampleWithNewData: NewCR = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
