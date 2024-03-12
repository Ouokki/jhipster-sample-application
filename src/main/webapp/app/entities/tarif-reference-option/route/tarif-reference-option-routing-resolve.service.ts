import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITarifReferenceOption } from '../tarif-reference-option.model';
import { TarifReferenceOptionService } from '../service/tarif-reference-option.service';

export const tarifReferenceOptionResolve = (route: ActivatedRouteSnapshot): Observable<null | ITarifReferenceOption> => {
  const id = route.params['id'];
  if (id) {
    return inject(TarifReferenceOptionService)
      .find(id)
      .pipe(
        mergeMap((tarifReferenceOption: HttpResponse<ITarifReferenceOption>) => {
          if (tarifReferenceOption.body) {
            return of(tarifReferenceOption.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tarifReferenceOptionResolve;
