import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { ITarif } from 'app/entities/tarif/tarif.model';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';

export interface IOptionProduitCommerces {
  id: number;
  tarifReferenceOption?: ITarifReferenceOption | null;
  tarif?: ITarif | null;
  parametrage?: IParametrage | null;
}

export type NewOptionProduitCommerces = Omit<IOptionProduitCommerces, 'id'> & { id: null };
