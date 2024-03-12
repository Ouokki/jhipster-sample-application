import { ITarifCommercant, NewTarifCommercant } from './tarif-commercant.model';

export const sampleWithRequiredData: ITarifCommercant = {
  id: 7892,
};

export const sampleWithPartialData: ITarifCommercant = {
  id: 4834,
};

export const sampleWithFullData: ITarifCommercant = {
  id: 16818,
  typeCommission: 'GRILLE',
};

export const sampleWithNewData: NewTarifCommercant = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
