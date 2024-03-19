import { ITarifReferenceOption, NewTarifReferenceOption } from './tarif-reference-option.model';

export const sampleWithRequiredData: ITarifReferenceOption = {
  id: 5735,
};

export const sampleWithPartialData: ITarifReferenceOption = {
  id: 7972,
};

export const sampleWithFullData: ITarifReferenceOption = {
  id: 25755,
  trigramme: 'round',
};

export const sampleWithNewData: NewTarifReferenceOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
