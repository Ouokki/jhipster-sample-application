import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ReferenceOptionProduitCommercesComponent } from './list/reference-option-produit-commerces.component';
import { ReferenceOptionProduitCommercesDetailComponent } from './detail/reference-option-produit-commerces-detail.component';
import { ReferenceOptionProduitCommercesUpdateComponent } from './update/reference-option-produit-commerces-update.component';
import ReferenceOptionProduitCommercesResolve from './route/reference-option-produit-commerces-routing-resolve.service';

const referenceOptionProduitCommercesRoute: Routes = [
  {
    path: '',
    component: ReferenceOptionProduitCommercesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReferenceOptionProduitCommercesDetailComponent,
    resolve: {
      referenceOptionProduitCommerces: ReferenceOptionProduitCommercesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReferenceOptionProduitCommercesUpdateComponent,
    resolve: {
      referenceOptionProduitCommerces: ReferenceOptionProduitCommercesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReferenceOptionProduitCommercesUpdateComponent,
    resolve: {
      referenceOptionProduitCommerces: ReferenceOptionProduitCommercesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default referenceOptionProduitCommercesRoute;
