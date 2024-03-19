import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOptionProduitCommerces } from '../option-produit-commerces.model';
import { OptionProduitCommercesService } from '../service/option-produit-commerces.service';

export const optionProduitCommercesResolve = (route: ActivatedRouteSnapshot): Observable<null | IOptionProduitCommerces> => {
  const id = route.params['id'];
  if (id) {
    return inject(OptionProduitCommercesService)
      .find(id)
      .pipe(
        mergeMap((optionProduitCommerces: HttpResponse<IOptionProduitCommerces>) => {
          if (optionProduitCommerces.body) {
            return of(optionProduitCommerces.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default optionProduitCommercesResolve;
