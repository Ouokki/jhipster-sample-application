import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITarif } from '../tarif.model';
import { TarifService } from '../service/tarif.service';

export const tarifResolve = (route: ActivatedRouteSnapshot): Observable<null | ITarif> => {
  const id = route.params['id'];
  if (id) {
    return inject(TarifService)
      .find(id)
      .pipe(
        mergeMap((tarif: HttpResponse<ITarif>) => {
          if (tarif.body) {
            return of(tarif.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tarifResolve;
