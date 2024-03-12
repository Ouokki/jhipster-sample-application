import { IOptionProduitCommerces, NewOptionProduitCommerces } from './option-produit-commerces.model';

export const sampleWithRequiredData: IOptionProduitCommerces = {
  id: 15426,
};

export const sampleWithPartialData: IOptionProduitCommerces = {
  id: 7533,
};

export const sampleWithFullData: IOptionProduitCommerces = {
  id: 7786,
};

export const sampleWithNewData: NewOptionProduitCommerces = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
