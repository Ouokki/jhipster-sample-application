import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConformite } from '../conformite.model';
import { ConformiteService } from '../service/conformite.service';

export const conformiteResolve = (route: ActivatedRouteSnapshot): Observable<null | IConformite> => {
  const id = route.params['id'];
  if (id) {
    return inject(ConformiteService)
      .find(id)
      .pipe(
        mergeMap((conformite: HttpResponse<IConformite>) => {
          if (conformite.body) {
            return of(conformite.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default conformiteResolve;
