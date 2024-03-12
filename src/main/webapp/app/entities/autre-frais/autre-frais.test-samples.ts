import { IAutreFrais, NewAutreFrais } from './autre-frais.model';

export const sampleWithRequiredData: IAutreFrais = {
  id: 27307,
};

export const sampleWithPartialData: IAutreFrais = {
  id: 22442,
  domaineFrais: 'SOUSCRIPTION',
};

export const sampleWithFullData: IAutreFrais = {
  id: 3940,
  domaineFrais: 'SOUSCRIPTION',
};

export const sampleWithNewData: NewAutreFrais = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
