import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { AutreFraisComponent } from './list/autre-frais.component';
import { AutreFraisDetailComponent } from './detail/autre-frais-detail.component';
import { AutreFraisUpdateComponent } from './update/autre-frais-update.component';
import AutreFraisResolve from './route/autre-frais-routing-resolve.service';

const autreFraisRoute: Routes = [
  {
    path: '',
    component: AutreFraisComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AutreFraisDetailComponent,
    resolve: {
      autreFrais: AutreFraisResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AutreFraisUpdateComponent,
    resolve: {
      autreFrais: AutreFraisResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AutreFraisUpdateComponent,
    resolve: {
      autreFrais: AutreFraisResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default autreFraisRoute;
