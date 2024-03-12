import { IOffre, NewOffre } from './offre.model';

export const sampleWithRequiredData: IOffre = {
  id: 26232,
};

export const sampleWithPartialData: IOffre = {
  id: 9426,
};

export const sampleWithFullData: IOffre = {
  id: 25130,
  codeOffre: 'miserably psst ah',
  libelleOffre: 'idealistic',
  referenceEchangeAVEM: 'immediately',
  referenceEchangeCAPS: 'showy scarily with',
};

export const sampleWithNewData: NewOffre = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
