import { IParametrage, NewParametrage } from './parametrage.model';

export const sampleWithRequiredData: IParametrage = {
  id: 25826,
};

export const sampleWithPartialData: IParametrage = {
  id: 30772,
};

export const sampleWithFullData: IParametrage = {
  id: 18336,
};

export const sampleWithNewData: NewParametrage = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
