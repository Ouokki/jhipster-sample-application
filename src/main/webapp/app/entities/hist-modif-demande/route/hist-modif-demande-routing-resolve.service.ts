import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHistModifDemande } from '../hist-modif-demande.model';
import { HistModifDemandeService } from '../service/hist-modif-demande.service';

export const histModifDemandeResolve = (route: ActivatedRouteSnapshot): Observable<null | IHistModifDemande> => {
  const id = route.params['id'];
  if (id) {
    return inject(HistModifDemandeService)
      .find(id)
      .pipe(
        mergeMap((histModifDemande: HttpResponse<IHistModifDemande>) => {
          if (histModifDemande.body) {
            return of(histModifDemande.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default histModifDemandeResolve;
