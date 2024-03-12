import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOffreProduit } from '../offre-produit.model';
import { OffreProduitService } from '../service/offre-produit.service';

export const offreProduitResolve = (route: ActivatedRouteSnapshot): Observable<null | IOffreProduit> => {
  const id = route.params['id'];
  if (id) {
    return inject(OffreProduitService)
      .find(id)
      .pipe(
        mergeMap((offreProduit: HttpResponse<IOffreProduit>) => {
          if (offreProduit.body) {
            return of(offreProduit.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default offreProduitResolve;
