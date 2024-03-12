import { ITarif } from 'app/entities/tarif/tarif.model';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { TypeCommissionCommercant } from 'app/entities/enumerations/type-commission-commercant.model';

export interface ITarifCommercant {
  id: number;
  typeCommission?: keyof typeof TypeCommissionCommercant | null;
  tarif?: ITarif | null;
  parametrage?: IParametrage | null;
}

export type NewTarifCommercant = Omit<ITarifCommercant, 'id'> & { id: null };
