import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFdo } from '../fdo.model';
import { FdoService } from '../service/fdo.service';

export const fdoResolve = (route: ActivatedRouteSnapshot): Observable<null | IFdo> => {
  const id = route.params['id'];
  if (id) {
    return inject(FdoService)
      .find(id)
      .pipe(
        mergeMap((fdo: HttpResponse<IFdo>) => {
          if (fdo.body) {
            return of(fdo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default fdoResolve;
