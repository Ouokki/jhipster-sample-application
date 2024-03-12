import dayjs from 'dayjs/esm';

import { IHistModifDemande, NewHistModifDemande } from './hist-modif-demande.model';

export const sampleWithRequiredData: IHistModifDemande = {
  id: 8358,
};

export const sampleWithPartialData: IHistModifDemande = {
  id: 5822,
  dateModification: dayjs('2024-03-12T06:43'),
  detailsModifications: 'reinscription slowly',
};

export const sampleWithFullData: IHistModifDemande = {
  id: 28827,
  dateModification: dayjs('2024-03-12T01:35'),
  typeModification: 'even',
  detailsModifications: 'trigger',
};

export const sampleWithNewData: NewHistModifDemande = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
