import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';

export interface IOptionProduitCommerces {
  id: number;
  tarifReferenceOption?: ITarifReferenceOption | null;
  parametrages?: IParametrage[] | null;
}

export type NewOptionProduitCommerces = Omit<IOptionProduitCommerces, 'id'> & { id: null };
