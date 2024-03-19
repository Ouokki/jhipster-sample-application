import { IGarantie } from 'app/entities/garantie/garantie.model';
import { IDemande } from 'app/entities/demande/demande.model';
import { IConformite } from 'app/entities/conformite/conformite.model';
import { ITarifCommercant } from 'app/entities/tarif-commercant/tarif-commercant.model';
import { IOptionProduitCommerces } from 'app/entities/option-produit-commerces/option-produit-commerces.model';
import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';

export interface IParametrage {
  id: number;
  garantie?: IGarantie | null;
  demande?: IDemande | null;
  conformite?: IConformite | null;
  tarifCommercants?: ITarifCommercant[] | null;
  optionProduitCommerces?: IOptionProduitCommerces[] | null;
  offreProduit?: IOffreProduit | null;
}

export type NewParametrage = Omit<IParametrage, 'id'> & { id: null };
