import { ITarifCommercant, NewTarifCommercant } from './tarif-commercant.model';

export const sampleWithRequiredData: ITarifCommercant = {
  id: 4834,
};

export const sampleWithPartialData: ITarifCommercant = {
  id: 21148,
  champMatrice: 'playfully remorseful rouse',
};

export const sampleWithFullData: ITarifCommercant = {
  id: 2036,
  nomCommission: 'strictly wonderfully',
  typeCommission: 'GRILLE',
  champMatrice: 'meanwhile',
};

export const sampleWithNewData: NewTarifCommercant = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
