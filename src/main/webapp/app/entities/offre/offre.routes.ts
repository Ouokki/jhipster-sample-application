import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OffreComponent } from './list/offre.component';
import { OffreDetailComponent } from './detail/offre-detail.component';
import { OffreUpdateComponent } from './update/offre-update.component';
import OffreResolve from './route/offre-routing-resolve.service';

const offreRoute: Routes = [
  {
    path: '',
    component: OffreComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OffreDetailComponent,
    resolve: {
      offre: OffreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OffreUpdateComponent,
    resolve: {
      offre: OffreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OffreUpdateComponent,
    resolve: {
      offre: OffreResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default offreRoute;
