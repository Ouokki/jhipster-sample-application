import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 24667,
};

export const sampleWithPartialData: IOption = {
  id: 25985,
};

export const sampleWithFullData: IOption = {
  id: 2156,
};

export const sampleWithNewData: NewOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
