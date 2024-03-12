import { ICR, NewCR } from './cr.model';

export const sampleWithRequiredData: ICR = {
  id: 29214,
};

export const sampleWithPartialData: ICR = {
  id: 4434,
  isAmex: true,
};

export const sampleWithFullData: ICR = {
  id: 28382,
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
