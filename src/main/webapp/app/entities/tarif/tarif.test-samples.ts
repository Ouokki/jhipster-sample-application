import { ITarif, NewTarif } from './tarif.model';

export const sampleWithRequiredData: ITarif = {
  id: 12343,
};

export const sampleWithPartialData: ITarif = {
  id: 28582,
  tarifMaximum: 'bare forbear through',
  unite: 'gadzooks instead',
};

export const sampleWithFullData: ITarif = {
  id: 9540,
  tarifParDefaut: 'untidy beside',
  tarifMinimum: 'naturalize drummer knowledgeable',
  tarifMaximum: 'onto aw',
  unite: 'report method',
};

export const sampleWithNewData: NewTarif = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
