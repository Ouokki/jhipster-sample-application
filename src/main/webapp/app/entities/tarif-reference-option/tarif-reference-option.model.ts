import { IReferenceOptionProduitCommerces } from 'app/entities/reference-option-produit-commerces/reference-option-produit-commerces.model';
import { IOptionProduitCommerces } from 'app/entities/option-produit-commerces/option-produit-commerces.model';
import { ITarif } from 'app/entities/tarif/tarif.model';

export interface ITarifReferenceOption {
  id: number;
  trigramme?: string | null;
  referenceOptionProduitCommerces?: IReferenceOptionProduitCommerces[] | null;
  optionProduitCommerces?: IOptionProduitCommerces | null;
  tarif?: ITarif | null;
}

export type NewTarifReferenceOption = Omit<ITarifReferenceOption, 'id'> & { id: null };
