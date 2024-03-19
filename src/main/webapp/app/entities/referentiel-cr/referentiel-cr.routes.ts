import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ReferentielCRComponent } from './list/referentiel-cr.component';
import { ReferentielCRDetailComponent } from './detail/referentiel-cr-detail.component';
import { ReferentielCRUpdateComponent } from './update/referentiel-cr-update.component';
import ReferentielCRResolve from './route/referentiel-cr-routing-resolve.service';

const referentielCRRoute: Routes = [
  {
    path: '',
    component: ReferentielCRComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReferentielCRDetailComponent,
    resolve: {
      referentielCR: ReferentielCRResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReferentielCRUpdateComponent,
    resolve: {
      referentielCR: ReferentielCRResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReferentielCRUpdateComponent,
    resolve: {
      referentielCR: ReferentielCRResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default referentielCRRoute;
