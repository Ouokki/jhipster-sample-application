import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HistModifDemandeComponent } from './list/hist-modif-demande.component';
import { HistModifDemandeDetailComponent } from './detail/hist-modif-demande-detail.component';
import { HistModifDemandeUpdateComponent } from './update/hist-modif-demande-update.component';
import HistModifDemandeResolve from './route/hist-modif-demande-routing-resolve.service';

const histModifDemandeRoute: Routes = [
  {
    path: '',
    component: HistModifDemandeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistModifDemandeDetailComponent,
    resolve: {
      histModifDemande: HistModifDemandeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistModifDemandeUpdateComponent,
    resolve: {
      histModifDemande: HistModifDemandeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistModifDemandeUpdateComponent,
    resolve: {
      histModifDemande: HistModifDemandeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default histModifDemandeRoute;
