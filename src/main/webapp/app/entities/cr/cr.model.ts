import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';
import { IReferentielCR } from 'app/entities/referentiel-cr/referentiel-cr.model';

export interface ICR {
  id: number;
  isAvem?: boolean | null;
  isAmex?: boolean | null;
  offreProduits?: IOffreProduit[] | null;
  referentielCR?: IReferentielCR | null;
}

export type NewCR = Omit<ICR, 'id'> & { id: null };
