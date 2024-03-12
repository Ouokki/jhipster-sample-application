import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICR } from '../cr.model';
import { CRService } from '../service/cr.service';

export const cRResolve = (route: ActivatedRouteSnapshot): Observable<null | ICR> => {
  const id = route.params['id'];
  if (id) {
    return inject(CRService)
      .find(id)
      .pipe(
        mergeMap((cR: HttpResponse<ICR>) => {
          if (cR.body) {
            return of(cR.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default cRResolve;
