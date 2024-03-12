import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILogiciel } from '../logiciel.model';
import { LogicielService } from '../service/logiciel.service';

export const logicielResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogiciel> => {
  const id = route.params['id'];
  if (id) {
    return inject(LogicielService)
      .find(id)
      .pipe(
        mergeMap((logiciel: HttpResponse<ILogiciel>) => {
          if (logiciel.body) {
            return of(logiciel.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default logicielResolve;
