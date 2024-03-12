import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITarifCommercant } from '../tarif-commercant.model';
import { TarifCommercantService } from '../service/tarif-commercant.service';

export const tarifCommercantResolve = (route: ActivatedRouteSnapshot): Observable<null | ITarifCommercant> => {
  const id = route.params['id'];
  if (id) {
    return inject(TarifCommercantService)
      .find(id)
      .pipe(
        mergeMap((tarifCommercant: HttpResponse<ITarifCommercant>) => {
          if (tarifCommercant.body) {
            return of(tarifCommercant.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tarifCommercantResolve;
