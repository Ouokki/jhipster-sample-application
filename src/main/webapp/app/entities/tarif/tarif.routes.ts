import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TarifComponent } from './list/tarif.component';
import { TarifDetailComponent } from './detail/tarif-detail.component';
import { TarifUpdateComponent } from './update/tarif-update.component';
import TarifResolve from './route/tarif-routing-resolve.service';

const tarifRoute: Routes = [
  {
    path: '',
    component: TarifComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TarifDetailComponent,
    resolve: {
      tarif: TarifResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TarifUpdateComponent,
    resolve: {
      tarif: TarifResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TarifUpdateComponent,
    resolve: {
      tarif: TarifResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tarifRoute;
