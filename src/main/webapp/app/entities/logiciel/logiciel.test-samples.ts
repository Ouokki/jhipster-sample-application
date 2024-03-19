import { ILogiciel, NewLogiciel } from './logiciel.model';

export const sampleWithRequiredData: ILogiciel = {
  id: 8075,
};

export const sampleWithPartialData: ILogiciel = {
  id: 16014,
};

export const sampleWithFullData: ILogiciel = {
  id: 30804,
  parDefault: true,
};

export const sampleWithNewData: NewLogiciel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
