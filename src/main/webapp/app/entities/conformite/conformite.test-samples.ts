import { IConformite, NewConformite } from './conformite.model';

export const sampleWithRequiredData: IConformite = {
  id: 30351,
};

export const sampleWithPartialData: IConformite = {
  id: 11907,
  lienBonita: 'foolish discriminate',
};

export const sampleWithFullData: IConformite = {
  id: 2400,
  affichage: true,
  lienBonita: 'derive granular',
};

export const sampleWithNewData: NewConformite = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
