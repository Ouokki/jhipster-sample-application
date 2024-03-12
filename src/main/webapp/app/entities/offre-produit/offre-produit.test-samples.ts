import { IOffreProduit, NewOffreProduit } from './offre-produit.model';

export const sampleWithRequiredData: IOffreProduit = {
  id: 8531,
};

export const sampleWithPartialData: IOffreProduit = {
  id: 15860,
  activeProd: true,
  activeDEVTU: true,
};

export const sampleWithFullData: IOffreProduit = {
  id: 12148,
  activeProd: true,
  activeNEHOM: true,
  activeVMOA: true,
  activeDEVTU: false,
};

export const sampleWithNewData: NewOffreProduit = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
