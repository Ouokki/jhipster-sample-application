import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { ITarifCommercant } from 'app/entities/tarif-commercant/tarif-commercant.model';

export interface ITarif {
  id: number;
  tarifParDefaut?: string | null;
  tarifMinimum?: string | null;
  tarifMaximum?: string | null;
  unite?: string | null;
  tarifReferenceOption?: ITarifReferenceOption | null;
  tarifCommercant?: ITarifCommercant | null;
}

export type NewTarif = Omit<ITarif, 'id'> & { id: null };
