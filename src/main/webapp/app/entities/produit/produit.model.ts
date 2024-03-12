import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';

export interface IProduit {
  id: number;
  codeProduit?: string | null;
  libelleProduit?: string | null;
  offreProduits?: IOffreProduit[] | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
