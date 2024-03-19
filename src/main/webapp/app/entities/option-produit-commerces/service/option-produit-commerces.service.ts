import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOptionProduitCommerces, NewOptionProduitCommerces } from '../option-produit-commerces.model';

export type PartialUpdateOptionProduitCommerces = Partial<IOptionProduitCommerces> & Pick<IOptionProduitCommerces, 'id'>;

export type EntityResponseType = HttpResponse<IOptionProduitCommerces>;
export type EntityArrayResponseType = HttpResponse<IOptionProduitCommerces[]>;

@Injectable({ providedIn: 'root' })
export class OptionProduitCommercesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/option-produit-commerces');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(optionProduitCommerces: NewOptionProduitCommerces): Observable<EntityResponseType> {
    return this.http.post<IOptionProduitCommerces>(this.resourceUrl, optionProduitCommerces, { observe: 'response' });
  }

  update(optionProduitCommerces: IOptionProduitCommerces): Observable<EntityResponseType> {
    return this.http.put<IOptionProduitCommerces>(
      `${this.resourceUrl}/${this.getOptionProduitCommercesIdentifier(optionProduitCommerces)}`,
      optionProduitCommerces,
      { observe: 'response' },
    );
  }

  partialUpdate(optionProduitCommerces: PartialUpdateOptionProduitCommerces): Observable<EntityResponseType> {
    return this.http.patch<IOptionProduitCommerces>(
      `${this.resourceUrl}/${this.getOptionProduitCommercesIdentifier(optionProduitCommerces)}`,
      optionProduitCommerces,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOptionProduitCommerces>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOptionProduitCommerces[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOptionProduitCommercesIdentifier(optionProduitCommerces: Pick<IOptionProduitCommerces, 'id'>): number {
    return optionProduitCommerces.id;
  }

  compareOptionProduitCommerces(o1: Pick<IOptionProduitCommerces, 'id'> | null, o2: Pick<IOptionProduitCommerces, 'id'> | null): boolean {
    return o1 && o2 ? this.getOptionProduitCommercesIdentifier(o1) === this.getOptionProduitCommercesIdentifier(o2) : o1 === o2;
  }

  addOptionProduitCommercesToCollectionIfMissing<Type extends Pick<IOptionProduitCommerces, 'id'>>(
    optionProduitCommercesCollection: Type[],
    ...optionProduitCommercesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const optionProduitCommerces: Type[] = optionProduitCommercesToCheck.filter(isPresent);
    if (optionProduitCommerces.length > 0) {
      const optionProduitCommercesCollectionIdentifiers = optionProduitCommercesCollection.map(
        optionProduitCommercesItem => this.getOptionProduitCommercesIdentifier(optionProduitCommercesItem)!,
      );
      const optionProduitCommercesToAdd = optionProduitCommerces.filter(optionProduitCommercesItem => {
        const optionProduitCommercesIdentifier = this.getOptionProduitCommercesIdentifier(optionProduitCommercesItem);
        if (optionProduitCommercesCollectionIdentifiers.includes(optionProduitCommercesIdentifier)) {
          return false;
        }
        optionProduitCommercesCollectionIdentifiers.push(optionProduitCommercesIdentifier);
        return true;
      });
      return [...optionProduitCommercesToAdd, ...optionProduitCommercesCollection];
    }
    return optionProduitCommercesCollection;
  }
}
