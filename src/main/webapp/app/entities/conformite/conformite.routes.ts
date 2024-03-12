import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { ConformiteComponent } from './list/conformite.component';
import { ConformiteDetailComponent } from './detail/conformite-detail.component';
import { ConformiteUpdateComponent } from './update/conformite-update.component';
import ConformiteResolve from './route/conformite-routing-resolve.service';

const conformiteRoute: Routes = [
  {
    path: '',
    component: ConformiteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConformiteDetailComponent,
    resolve: {
      conformite: ConformiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConformiteUpdateComponent,
    resolve: {
      conformite: ConformiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConformiteUpdateComponent,
    resolve: {
      conformite: ConformiteResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default conformiteRoute;
