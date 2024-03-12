import { IParametrage } from 'app/entities/parametrage/parametrage.model';

export interface IGarantie {
  id: number;
  montantAutorisationTransaction?: string | null;
  montantAutorisationTPE?: string | null;
  delaiRemise?: string | null;
  delaiCommunicationJustificatif?: string | null;
  parametrage?: IParametrage | null;
}

export type NewGarantie = Omit<IGarantie, 'id'> & { id: null };
