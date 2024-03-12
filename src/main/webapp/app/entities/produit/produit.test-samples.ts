import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 22471,
};

export const sampleWithPartialData: IProduit = {
  id: 19445,
  libelleProduit: 'considering since',
};

export const sampleWithFullData: IProduit = {
  id: 149,
  codeProduit: 'until ethics',
  libelleProduit: 'an quaintly',
};

export const sampleWithNewData: NewProduit = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
