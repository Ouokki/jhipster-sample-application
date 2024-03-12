import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';

export interface IReferenceOptionProduitCommerces {
  id: number;
  codeOptionProduit?: string | null;
  libelleOptionProduit?: string | null;
  tarifReferenceOptions?: ITarifReferenceOption[] | null;
}

export type NewReferenceOptionProduitCommerces = Omit<IReferenceOptionProduitCommerces, 'id'> & { id: null };
