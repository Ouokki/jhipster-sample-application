import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OffreProduitComponent } from './list/offre-produit.component';
import { OffreProduitDetailComponent } from './detail/offre-produit-detail.component';
import { OffreProduitUpdateComponent } from './update/offre-produit-update.component';
import OffreProduitResolve from './route/offre-produit-routing-resolve.service';

const offreProduitRoute: Routes = [
  {
    path: '',
    component: OffreProduitComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OffreProduitDetailComponent,
    resolve: {
      offreProduit: OffreProduitResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OffreProduitUpdateComponent,
    resolve: {
      offreProduit: OffreProduitResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OffreProduitUpdateComponent,
    resolve: {
      offreProduit: OffreProduitResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default offreProduitRoute;
