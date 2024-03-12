import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';

export interface IOffre {
  id: number;
  codeOffre?: string | null;
  libelleOffre?: string | null;
  referenceEchangeAVEM?: string | null;
  referenceEchangeCAPS?: string | null;
  offreProduits?: IOffreProduit[] | null;
}

export type NewOffre = Omit<IOffre, 'id'> & { id: null };
