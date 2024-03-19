import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReferentielCR } from '../referentiel-cr.model';
import { ReferentielCRService } from '../service/referentiel-cr.service';

export const referentielCRResolve = (route: ActivatedRouteSnapshot): Observable<null | IReferentielCR> => {
  const id = route.params['id'];
  if (id) {
    return inject(ReferentielCRService)
      .find(id)
      .pipe(
        mergeMap((referentielCR: HttpResponse<IReferentielCR>) => {
          if (referentielCR.body) {
            return of(referentielCR.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default referentielCRResolve;
