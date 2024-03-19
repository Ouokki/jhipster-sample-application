import { ITarifCommercant } from 'app/entities/tarif-commercant/tarif-commercant.model';
import { IOptionProduitCommerces } from 'app/entities/option-produit-commerces/option-produit-commerces.model';

export interface ITarif {
  id: number;
  tarifParDefaut?: string | null;
  tarifMinimum?: string | null;
  tarifMaximum?: string | null;
  unite?: string | null;
  tarifCommercant?: ITarifCommercant | null;
  optionProduitCommerces?: IOptionProduitCommerces | null;
}

export type NewTarif = Omit<ITarif, 'id'> & { id: null };
