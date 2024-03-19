import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ICR } from 'app/entities/cr/cr.model';
import { IOffre } from 'app/entities/offre/offre.model';
import { IProduit } from 'app/entities/produit/produit.model';

export interface IOffreProduit {
  id: number;
  activeProd?: boolean | null;
  activeNEHOM?: boolean | null;
  activeVMOA?: boolean | null;
  activeDEVTU?: boolean | null;
  parametrage?: IParametrage | null;
  cr?: ICR | null;
  offre?: IOffre | null;
  produit?: IProduit | null;
}

export type NewOffreProduit = Omit<IOffreProduit, 'id'> & { id: null };
