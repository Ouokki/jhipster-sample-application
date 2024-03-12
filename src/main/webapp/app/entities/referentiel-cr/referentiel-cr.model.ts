import { ICR } from 'app/entities/cr/cr.model';

export interface IReferentielCR {
  id: number;
  nomCR?: string | null;
  numeroCR?: string | null;
  cr?: ICR | null;
}

export type NewReferentielCR = Omit<IReferentielCR, 'id'> & { id: null };
