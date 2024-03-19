import dayjs from 'dayjs/esm';
import { IDemande } from 'app/entities/demande/demande.model';

export interface IHistModifDemande {
  id: number;
  dateModification?: dayjs.Dayjs | null;
  typeModification?: string | null;
  detailsModifications?: string | null;
  demande?: IDemande | null;
}

export type NewHistModifDemande = Omit<IHistModifDemande, 'id'> & { id: null };
