import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TarifCommercantComponent } from './list/tarif-commercant.component';
import { TarifCommercantDetailComponent } from './detail/tarif-commercant-detail.component';
import { TarifCommercantUpdateComponent } from './update/tarif-commercant-update.component';
import TarifCommercantResolve from './route/tarif-commercant-routing-resolve.service';

const tarifCommercantRoute: Routes = [
  {
    path: '',
    component: TarifCommercantComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TarifCommercantDetailComponent,
    resolve: {
      tarifCommercant: TarifCommercantResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TarifCommercantUpdateComponent,
    resolve: {
      tarifCommercant: TarifCommercantResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TarifCommercantUpdateComponent,
    resolve: {
      tarifCommercant: TarifCommercantResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tarifCommercantRoute;
