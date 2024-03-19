import dayjs from 'dayjs/esm';

import { IDemande, NewDemande } from './demande.model';

export const sampleWithRequiredData: IDemande = {
  id: 11332,
};

export const sampleWithPartialData: IDemande = {
  id: 22195,
};

export const sampleWithFullData: IDemande = {
  id: 5380,
  dateDemande: dayjs('2024-03-11T14:14'),
  validiation: false,
};

export const sampleWithNewData: NewDemande = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
