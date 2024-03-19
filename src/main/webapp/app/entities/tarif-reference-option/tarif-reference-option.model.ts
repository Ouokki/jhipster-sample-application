import { IReferenceOptionProduitCommerces } from 'app/entities/reference-option-produit-commerces/reference-option-produit-commerces.model';
import { IOptionProduitCommerces } from 'app/entities/option-produit-commerces/option-produit-commerces.model';

export interface ITarifReferenceOption {
  id: number;
  trigramme?: string | null;
  referenceOptionProduitCommerces?: IReferenceOptionProduitCommerces[] | null;
  optionProduitCommerces?: IOptionProduitCommerces | null;
}

export type NewTarifReferenceOption = Omit<ITarifReferenceOption, 'id'> & { id: null };
