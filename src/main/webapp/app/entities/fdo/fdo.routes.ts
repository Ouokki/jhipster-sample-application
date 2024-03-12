import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FdoComponent } from './list/fdo.component';
import { FdoDetailComponent } from './detail/fdo-detail.component';
import { FdoUpdateComponent } from './update/fdo-update.component';
import FdoResolve from './route/fdo-routing-resolve.service';

const fdoRoute: Routes = [
  {
    path: '',
    component: FdoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FdoDetailComponent,
    resolve: {
      fdo: FdoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FdoUpdateComponent,
    resolve: {
      fdo: FdoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FdoUpdateComponent,
    resolve: {
      fdo: FdoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default fdoRoute;
