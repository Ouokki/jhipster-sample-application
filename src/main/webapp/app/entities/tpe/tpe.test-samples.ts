import { ITpe, NewTpe } from './tpe.model';

export const sampleWithRequiredData: ITpe = {
  id: 1293,
};

export const sampleWithPartialData: ITpe = {
  id: 13329,
  imageTpe: 'instead zowie visible',
};

export const sampleWithFullData: ITpe = {
  id: 7910,
  imageTpe: 'apropos ugh',
  descriptif: 'corny',
};

export const sampleWithNewData: NewTpe = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
