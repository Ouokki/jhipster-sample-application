import { IParametrage, NewParametrage } from './parametrage.model';

export const sampleWithRequiredData: IParametrage = {
  id: 27756,
};

export const sampleWithPartialData: IParametrage = {
  id: 1174,
};

export const sampleWithFullData: IParametrage = {
  id: 5811,
};

export const sampleWithNewData: NewParametrage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
