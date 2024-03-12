import { DomaineFrais } from 'app/entities/enumerations/domaine-frais.model';

export interface IAutreFrais {
  id: number;
  domaineFrais?: keyof typeof DomaineFrais | null;
}

export type NewAutreFrais = Omit<IAutreFrais, 'id'> & { id: null };
