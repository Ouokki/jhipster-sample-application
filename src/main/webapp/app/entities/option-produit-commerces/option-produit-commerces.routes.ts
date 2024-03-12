import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OptionProduitCommercesComponent } from './list/option-produit-commerces.component';
import { OptionProduitCommercesDetailComponent } from './detail/option-produit-commerces-detail.component';
import { OptionProduitCommercesUpdateComponent } from './update/option-produit-commerces-update.component';
import OptionProduitCommercesResolve from './route/option-produit-commerces-routing-resolve.service';

const optionProduitCommercesRoute: Routes = [
  {
    path: '',
    component: OptionProduitCommercesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OptionProduitCommercesDetailComponent,
    resolve: {
      optionProduitCommerces: OptionProduitCommercesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OptionProduitCommercesUpdateComponent,
    resolve: {
      optionProduitCommerces: OptionProduitCommercesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OptionProduitCommercesUpdateComponent,
    resolve: {
      optionProduitCommerces: OptionProduitCommercesResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default optionProduitCommercesRoute;
