import { ITarifReferenceOption, NewTarifReferenceOption } from './tarif-reference-option.model';

export const sampleWithRequiredData: ITarifReferenceOption = {
  id: 25755,
};

export const sampleWithPartialData: ITarifReferenceOption = {
  id: 9061,
  trigramme: 'wonder cleverly',
};

export const sampleWithFullData: ITarifReferenceOption = {
  id: 6894,
  trigramme: 'puny',
};

export const sampleWithNewData: NewTarifReferenceOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
