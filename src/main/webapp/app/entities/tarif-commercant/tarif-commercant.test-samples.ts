import { ITarifCommercant, NewTarifCommercant } from './tarif-commercant.model';

export const sampleWithRequiredData: ITarifCommercant = {
  id: 16818,
};

export const sampleWithPartialData: ITarifCommercant = {
  id: 11806,
};

export const sampleWithFullData: ITarifCommercant = {
  id: 21148,
  typeCommission: 'GRILLE',
};

export const sampleWithNewData: NewTarifCommercant = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
