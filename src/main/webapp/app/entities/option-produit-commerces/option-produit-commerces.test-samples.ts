import { IOptionProduitCommerces, NewOptionProduitCommerces } from './option-produit-commerces.model';

export const sampleWithRequiredData: IOptionProduitCommerces = {
  id: 5714,
};

export const sampleWithPartialData: IOptionProduitCommerces = {
  id: 7122,
};

export const sampleWithFullData: IOptionProduitCommerces = {
  id: 14879,
};

export const sampleWithNewData: NewOptionProduitCommerces = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
