import { IFdo, NewFdo } from './fdo.model';

export const sampleWithRequiredData: IFdo = {
  id: 21210,
};

export const sampleWithPartialData: IFdo = {
  id: 4808,
};

export const sampleWithFullData: IFdo = {
  id: 5940,
};

export const sampleWithNewData: NewFdo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
