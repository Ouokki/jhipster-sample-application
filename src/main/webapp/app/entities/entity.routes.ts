import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'referentiel-cr',
    data: { pageTitle: 'jhipsterSampleApplicationApp.referentielCR.home.title' },
    loadChildren: () => import('./referentiel-cr/referentiel-cr.routes'),
  },
  {
    path: 'demande',
    data: { pageTitle: 'jhipsterSampleApplicationApp.demande.home.title' },
    loadChildren: () => import('./demande/demande.routes'),
  },
  {
    path: 'hist-modif-demande',
    data: { pageTitle: 'jhipsterSampleApplicationApp.histModifDemande.home.title' },
    loadChildren: () => import('./hist-modif-demande/hist-modif-demande.routes'),
  },
  {
    path: 'cr',
    data: { pageTitle: 'jhipsterSampleApplicationApp.cR.home.title' },
    loadChildren: () => import('./cr/cr.routes'),
  },
  {
    path: 'parametrage',
    data: { pageTitle: 'jhipsterSampleApplicationApp.parametrage.home.title' },
    loadChildren: () => import('./parametrage/parametrage.routes'),
  },
  {
    path: 'offre',
    data: { pageTitle: 'jhipsterSampleApplicationApp.offre.home.title' },
    loadChildren: () => import('./offre/offre.routes'),
  },
  {
    path: 'produit',
    data: { pageTitle: 'jhipsterSampleApplicationApp.produit.home.title' },
    loadChildren: () => import('./produit/produit.routes'),
  },
  {
    path: 'offre-produit',
    data: { pageTitle: 'jhipsterSampleApplicationApp.offreProduit.home.title' },
    loadChildren: () => import('./offre-produit/offre-produit.routes'),
  },
  {
    path: 'garantie',
    data: { pageTitle: 'jhipsterSampleApplicationApp.garantie.home.title' },
    loadChildren: () => import('./garantie/garantie.routes'),
  },
  {
    path: 'tarif-commercant',
    data: { pageTitle: 'jhipsterSampleApplicationApp.tarifCommercant.home.title' },
    loadChildren: () => import('./tarif-commercant/tarif-commercant.routes'),
  },
  {
    path: 'tarif',
    data: { pageTitle: 'jhipsterSampleApplicationApp.tarif.home.title' },
    loadChildren: () => import('./tarif/tarif.routes'),
  },
  {
    path: 'logiciel',
    data: { pageTitle: 'jhipsterSampleApplicationApp.logiciel.home.title' },
    loadChildren: () => import('./logiciel/logiciel.routes'),
  },
  {
    path: 'fdo',
    data: { pageTitle: 'jhipsterSampleApplicationApp.fdo.home.title' },
    loadChildren: () => import('./fdo/fdo.routes'),
  },
  {
    path: 'option',
    data: { pageTitle: 'jhipsterSampleApplicationApp.option.home.title' },
    loadChildren: () => import('./option/option.routes'),
  },
  {
    path: 'autre-frais',
    data: { pageTitle: 'jhipsterSampleApplicationApp.autreFrais.home.title' },
    loadChildren: () => import('./autre-frais/autre-frais.routes'),
  },
  {
    path: 'option-produit-commerces',
    data: { pageTitle: 'jhipsterSampleApplicationApp.optionProduitCommerces.home.title' },
    loadChildren: () => import('./option-produit-commerces/option-produit-commerces.routes'),
  },
  {
    path: 'reference-option-produit-commerces',
    data: { pageTitle: 'jhipsterSampleApplicationApp.referenceOptionProduitCommerces.home.title' },
    loadChildren: () => import('./reference-option-produit-commerces/reference-option-produit-commerces.routes'),
  },
  {
    path: 'tarif-reference-option',
    data: { pageTitle: 'jhipsterSampleApplicationApp.tarifReferenceOption.home.title' },
    loadChildren: () => import('./tarif-reference-option/tarif-reference-option.routes'),
  },
  {
    path: 'conformite',
    data: { pageTitle: 'jhipsterSampleApplicationApp.conformite.home.title' },
    loadChildren: () => import('./conformite/conformite.routes'),
  },
  {
    path: 'tpe',
    data: { pageTitle: 'jhipsterSampleApplicationApp.tpe.home.title' },
    loadChildren: () => import('./tpe/tpe.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
