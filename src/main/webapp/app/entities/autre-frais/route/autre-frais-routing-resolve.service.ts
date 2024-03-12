import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAutreFrais } from '../autre-frais.model';
import { AutreFraisService } from '../service/autre-frais.service';

export const autreFraisResolve = (route: ActivatedRouteSnapshot): Observable<null | IAutreFrais> => {
  const id = route.params['id'];
  if (id) {
    return inject(AutreFraisService)
      .find(id)
      .pipe(
        mergeMap((autreFrais: HttpResponse<IAutreFrais>) => {
          if (autreFrais.body) {
            return of(autreFrais.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default autreFraisResolve;
