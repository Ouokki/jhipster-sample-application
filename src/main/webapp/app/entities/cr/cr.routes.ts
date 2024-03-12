import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CRComponent } from './list/cr.component';
import { CRDetailComponent } from './detail/cr-detail.component';
import { CRUpdateComponent } from './update/cr-update.component';
import CRResolve from './route/cr-routing-resolve.service';

const cRRoute: Routes = [
  {
    path: '',
    component: CRComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CRDetailComponent,
    resolve: {
      cR: CRResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CRUpdateComponent,
    resolve: {
      cR: CRResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CRUpdateComponent,
    resolve: {
      cR: CRResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default cRRoute;
