import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGarantie, NewGarantie } from '../garantie.model';

export type PartialUpdateGarantie = Partial<IGarantie> & Pick<IGarantie, 'id'>;

export type EntityResponseType = HttpResponse<IGarantie>;
export type EntityArrayResponseType = HttpResponse<IGarantie[]>;

@Injectable({ providedIn: 'root' })
export class GarantieService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/garanties');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(garantie: NewGarantie): Observable<EntityResponseType> {
    return this.http.post<IGarantie>(this.resourceUrl, garantie, { observe: 'response' });
  }

  update(garantie: IGarantie): Observable<EntityResponseType> {
    return this.http.put<IGarantie>(`${this.resourceUrl}/${this.getGarantieIdentifier(garantie)}`, garantie, { observe: 'response' });
  }

  partialUpdate(garantie: PartialUpdateGarantie): Observable<EntityResponseType> {
    return this.http.patch<IGarantie>(`${this.resourceUrl}/${this.getGarantieIdentifier(garantie)}`, garantie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGarantie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGarantie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGarantieIdentifier(garantie: Pick<IGarantie, 'id'>): number {
    return garantie.id;
  }

  compareGarantie(o1: Pick<IGarantie, 'id'> | null, o2: Pick<IGarantie, 'id'> | null): boolean {
    return o1 && o2 ? this.getGarantieIdentifier(o1) === this.getGarantieIdentifier(o2) : o1 === o2;
  }

  addGarantieToCollectionIfMissing<Type extends Pick<IGarantie, 'id'>>(
    garantieCollection: Type[],
    ...garantiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const garanties: Type[] = garantiesToCheck.filter(isPresent);
    if (garanties.length > 0) {
      const garantieCollectionIdentifiers = garantieCollection.map(garantieItem => this.getGarantieIdentifier(garantieItem)!);
      const garantiesToAdd = garanties.filter(garantieItem => {
        const garantieIdentifier = this.getGarantieIdentifier(garantieItem);
        if (garantieCollectionIdentifiers.includes(garantieIdentifier)) {
          return false;
        }
        garantieCollectionIdentifiers.push(garantieIdentifier);
        return true;
      });
      return [...garantiesToAdd, ...garantieCollection];
    }
    return garantieCollection;
  }
}
