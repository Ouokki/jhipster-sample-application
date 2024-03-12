import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LogicielComponent } from './list/logiciel.component';
import { LogicielDetailComponent } from './detail/logiciel-detail.component';
import { LogicielUpdateComponent } from './update/logiciel-update.component';
import LogicielResolve from './route/logiciel-routing-resolve.service';

const logicielRoute: Routes = [
  {
    path: '',
    component: LogicielComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogicielDetailComponent,
    resolve: {
      logiciel: LogicielResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogicielUpdateComponent,
    resolve: {
      logiciel: LogicielResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogicielUpdateComponent,
    resolve: {
      logiciel: LogicielResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default logicielRoute;
