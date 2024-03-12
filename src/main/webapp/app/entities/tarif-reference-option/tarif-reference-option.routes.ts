import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TarifReferenceOptionComponent } from './list/tarif-reference-option.component';
import { TarifReferenceOptionDetailComponent } from './detail/tarif-reference-option-detail.component';
import { TarifReferenceOptionUpdateComponent } from './update/tarif-reference-option-update.component';
import TarifReferenceOptionResolve from './route/tarif-reference-option-routing-resolve.service';

const tarifReferenceOptionRoute: Routes = [
  {
    path: '',
    component: TarifReferenceOptionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TarifReferenceOptionDetailComponent,
    resolve: {
      tarifReferenceOption: TarifReferenceOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TarifReferenceOptionUpdateComponent,
    resolve: {
      tarifReferenceOption: TarifReferenceOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TarifReferenceOptionUpdateComponent,
    resolve: {
      tarifReferenceOption: TarifReferenceOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default tarifReferenceOptionRoute;
