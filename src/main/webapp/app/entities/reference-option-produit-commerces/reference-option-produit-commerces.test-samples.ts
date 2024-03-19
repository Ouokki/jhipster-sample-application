import { IReferenceOptionProduitCommerces, NewReferenceOptionProduitCommerces } from './reference-option-produit-commerces.model';

export const sampleWithRequiredData: IReferenceOptionProduitCommerces = {
  id: 22221,
};

export const sampleWithPartialData: IReferenceOptionProduitCommerces = {
  id: 4693,
  codeOptionProduit: 'oof',
};

export const sampleWithFullData: IReferenceOptionProduitCommerces = {
  id: 6555,
  codeOptionProduit: 'wither',
  libelleOptionProduit: 'woot ouch',
};

export const sampleWithNewData: NewReferenceOptionProduitCommerces = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
