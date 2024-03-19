import dayjs from 'dayjs/esm';
import { IHistModifDemande } from 'app/entities/hist-modif-demande/hist-modif-demande.model';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';

export interface IDemande {
  id: number;
  dateDemande?: dayjs.Dayjs | null;
  validiation?: boolean | null;
  histModifDemandes?: IHistModifDemande[] | null;
  parametrage?: IParametrage | null;
}

export type NewDemande = Omit<IDemande, 'id'> & { id: null };
