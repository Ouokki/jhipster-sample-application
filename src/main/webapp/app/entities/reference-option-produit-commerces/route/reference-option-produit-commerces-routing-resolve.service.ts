import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesService } from '../service/reference-option-produit-commerces.service';

export const referenceOptionProduitCommercesResolve = (
  route: ActivatedRouteSnapshot,
): Observable<null | IReferenceOptionProduitCommerces> => {
  const id = route.params['id'];
  if (id) {
    return inject(ReferenceOptionProduitCommercesService)
      .find(id)
      .pipe(
        mergeMap((referenceOptionProduitCommerces: HttpResponse<IReferenceOptionProduitCommerces>) => {
          if (referenceOptionProduitCommerces.body) {
            return of(referenceOptionProduitCommerces.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default referenceOptionProduitCommercesResolve;
