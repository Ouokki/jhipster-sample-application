import { IOffreProduit, NewOffreProduit } from './offre-produit.model';

export const sampleWithRequiredData: IOffreProduit = {
  id: 20564,
};

export const sampleWithPartialData: IOffreProduit = {
  id: 12148,
  activeProd: true,
  activeNEHOM: true,
  activeVMOA: true,
  activeDEVTU: false,
};

export const sampleWithFullData: IOffreProduit = {
  id: 11605,
  activeProd: false,
  activeNEHOM: false,
  activeVMOA: false,
  activeDEVTU: false,
};

export const sampleWithNewData: NewOffreProduit = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
