import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ParametrageComponent } from './list/parametrage.component';
import { ParametrageDetailComponent } from './detail/parametrage-detail.component';
import { ParametrageUpdateComponent } from './update/parametrage-update.component';
import ParametrageResolve from './route/parametrage-routing-resolve.service';

const parametrageRoute: Routes = [
  {
    path: '',
    component: ParametrageComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParametrageDetailComponent,
    resolve: {
      parametrage: ParametrageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParametrageUpdateComponent,
    resolve: {
      parametrage: ParametrageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParametrageUpdateComponent,
    resolve: {
      parametrage: ParametrageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default parametrageRoute;
