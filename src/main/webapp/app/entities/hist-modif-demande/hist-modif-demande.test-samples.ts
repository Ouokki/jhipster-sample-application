import dayjs from 'dayjs/esm';

import { IHistModifDemande, NewHistModifDemande } from './hist-modif-demande.model';

export const sampleWithRequiredData: IHistModifDemande = {
  id: 8958,
};

export const sampleWithPartialData: IHistModifDemande = {
  id: 811,
  dateModification: dayjs('2024-03-12T03:00'),
  typeModification: 'dearly',
};

export const sampleWithFullData: IHistModifDemande = {
  id: 28410,
  dateModification: dayjs('2024-03-12T04:05'),
  typeModification: 'yuck',
  detailsModifications: 'which comment but',
};

export const sampleWithNewData: NewHistModifDemande = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
