import { IConformite, NewConformite } from './conformite.model';

export const sampleWithRequiredData: IConformite = {
  id: 18668,
};

export const sampleWithPartialData: IConformite = {
  id: 30351,
  affichage: false,
};

export const sampleWithFullData: IConformite = {
  id: 8907,
  affichage: true,
  lienBonita: 'foolish discriminate',
};

export const sampleWithNewData: NewConformite = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
