import { IParametrage } from 'app/entities/parametrage/parametrage.model';

export interface IConformite {
  id: number;
  affichage?: boolean | null;
  lienBonita?: string | null;
  parametrage?: IParametrage | null;
}

export type NewConformite = Omit<IConformite, 'id'> & { id: null };
