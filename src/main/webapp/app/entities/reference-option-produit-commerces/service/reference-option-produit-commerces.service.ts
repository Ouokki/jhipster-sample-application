import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReferenceOptionProduitCommerces, NewReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';

export type PartialUpdateReferenceOptionProduitCommerces = Partial<IReferenceOptionProduitCommerces> &
  Pick<IReferenceOptionProduitCommerces, 'id'>;

export type EntityResponseType = HttpResponse<IReferenceOptionProduitCommerces>;
export type EntityArrayResponseType = HttpResponse<IReferenceOptionProduitCommerces[]>;

@Injectable({ providedIn: 'root' })
export class ReferenceOptionProduitCommercesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/reference-option-produit-commerces');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(referenceOptionProduitCommerces: NewReferenceOptionProduitCommerces): Observable<EntityResponseType> {
    return this.http.post<IReferenceOptionProduitCommerces>(this.resourceUrl, referenceOptionProduitCommerces, { observe: 'response' });
  }

  update(referenceOptionProduitCommerces: IReferenceOptionProduitCommerces): Observable<EntityResponseType> {
    return this.http.put<IReferenceOptionProduitCommerces>(
      `${this.resourceUrl}/${this.getReferenceOptionProduitCommercesIdentifier(referenceOptionProduitCommerces)}`,
      referenceOptionProduitCommerces,
      { observe: 'response' },
    );
  }

  partialUpdate(referenceOptionProduitCommerces: PartialUpdateReferenceOptionProduitCommerces): Observable<EntityResponseType> {
    return this.http.patch<IReferenceOptionProduitCommerces>(
      `${this.resourceUrl}/${this.getReferenceOptionProduitCommercesIdentifier(referenceOptionProduitCommerces)}`,
      referenceOptionProduitCommerces,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReferenceOptionProduitCommerces>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReferenceOptionProduitCommerces[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getReferenceOptionProduitCommercesIdentifier(referenceOptionProduitCommerces: Pick<IReferenceOptionProduitCommerces, 'id'>): number {
    return referenceOptionProduitCommerces.id;
  }

  compareReferenceOptionProduitCommerces(
    o1: Pick<IReferenceOptionProduitCommerces, 'id'> | null,
    o2: Pick<IReferenceOptionProduitCommerces, 'id'> | null,
  ): boolean {
    return o1 && o2
      ? this.getReferenceOptionProduitCommercesIdentifier(o1) === this.getReferenceOptionProduitCommercesIdentifier(o2)
      : o1 === o2;
  }

  addReferenceOptionProduitCommercesToCollectionIfMissing<Type extends Pick<IReferenceOptionProduitCommerces, 'id'>>(
    referenceOptionProduitCommercesCollection: Type[],
    ...referenceOptionProduitCommercesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const referenceOptionProduitCommerces: Type[] = referenceOptionProduitCommercesToCheck.filter(isPresent);
    if (referenceOptionProduitCommerces.length > 0) {
      const referenceOptionProduitCommercesCollectionIdentifiers = referenceOptionProduitCommercesCollection.map(
        referenceOptionProduitCommercesItem => this.getReferenceOptionProduitCommercesIdentifier(referenceOptionProduitCommercesItem)!,
      );
      const referenceOptionProduitCommercesToAdd = referenceOptionProduitCommerces.filter(referenceOptionProduitCommercesItem => {
        const referenceOptionProduitCommercesIdentifier =
          this.getReferenceOptionProduitCommercesIdentifier(referenceOptionProduitCommercesItem);
        if (referenceOptionProduitCommercesCollectionIdentifiers.includes(referenceOptionProduitCommercesIdentifier)) {
          return false;
        }
        referenceOptionProduitCommercesCollectionIdentifiers.push(referenceOptionProduitCommercesIdentifier);
        return true;
      });
      return [...referenceOptionProduitCommercesToAdd, ...referenceOptionProduitCommercesCollection];
    }
    return referenceOptionProduitCommercesCollection;
  }
}
