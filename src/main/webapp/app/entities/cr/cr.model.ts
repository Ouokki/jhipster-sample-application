import { IReferentielCR } from 'app/entities/referentiel-cr/referentiel-cr.model';
import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';

export interface ICR {
  id: number;
  isAvem?: boolean | null;
  isAmex?: boolean | null;
  referentielCRS?: IReferentielCR[] | null;
  offreProduits?: IOffreProduit[] | null;
}

export type NewCR = Omit<ICR, 'id'> & { id: null };
