import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITpe } from '../tpe.model';
import { TpeService } from '../service/tpe.service';

export const tpeResolve = (route: ActivatedRouteSnapshot): Observable<null | ITpe> => {
  const id = route.params['id'];
  if (id) {
    return inject(TpeService)
      .find(id)
      .pipe(
        mergeMap((tpe: HttpResponse<ITpe>) => {
          if (tpe.body) {
            return of(tpe.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default tpeResolve;
