import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TpeComponent } from './list/tpe.component';
import { TpeDetailComponent } from './detail/tpe-detail.component';
import { TpeUpdateComponent } from './update/tpe-update.component';
import TpeResolve from './route/tpe-routing-resolve.service';

const tpeRoute: Routes = [
  {
    path: '',
    component: TpeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TpeDetailComponent,
    resolve: {
      tpe: TpeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TpeUpdateComponent,
    resolve: {
      tpe: TpeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TpeUpdateComponent,
    resolve: {
      tpe: TpeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tpeRoute;
