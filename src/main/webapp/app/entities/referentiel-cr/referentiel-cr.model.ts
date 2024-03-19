import { ICR } from 'app/entities/cr/cr.model';

export interface IReferentielCR {
  id: number;
  nomCR?: string | null;
  numeroCR?: string | null;
  crs?: ICR[] | null;
}

export type NewReferentielCR = Omit<IReferentielCR, 'id'> & { id: null };
