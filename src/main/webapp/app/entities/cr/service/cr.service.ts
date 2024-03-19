import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICR, NewCR } from '../cr.model';

export type PartialUpdateCR = Partial<ICR> & Pick<ICR, 'id'>;

export type EntityResponseType = HttpResponse<ICR>;
export type EntityArrayResponseType = HttpResponse<ICR[]>;

@Injectable({ providedIn: 'root' })
export class CRService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(cR: NewCR): Observable<EntityResponseType> {
    return this.http.post<ICR>(this.resourceUrl, cR, { observe: 'response' });
  }

  update(cR: ICR): Observable<EntityResponseType> {
    return this.http.put<ICR>(`${this.resourceUrl}/${this.getCRIdentifier(cR)}`, cR, { observe: 'response' });
  }

  partialUpdate(cR: PartialUpdateCR): Observable<EntityResponseType> {
    return this.http.patch<ICR>(`${this.resourceUrl}/${this.getCRIdentifier(cR)}`, cR, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICR>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICR[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCRIdentifier(cR: Pick<ICR, 'id'>): number {
    return cR.id;
  }

  compareCR(o1: Pick<ICR, 'id'> | null, o2: Pick<ICR, 'id'> | null): boolean {
    return o1 && o2 ? this.getCRIdentifier(o1) === this.getCRIdentifier(o2) : o1 === o2;
  }

  addCRToCollectionIfMissing<Type extends Pick<ICR, 'id'>>(cRCollection: Type[], ...cRSToCheck: (Type | null | undefined)[]): Type[] {
    const cRS: Type[] = cRSToCheck.filter(isPresent);
    if (cRS.length > 0) {
      const cRCollectionIdentifiers = cRCollection.map(cRItem => this.getCRIdentifier(cRItem)!);
      const cRSToAdd = cRS.filter(cRItem => {
        const cRIdentifier = this.getCRIdentifier(cRItem);
        if (cRCollectionIdentifiers.includes(cRIdentifier)) {
          return false;
        }
        cRCollectionIdentifiers.push(cRIdentifier);
        return true;
      });
      return [...cRSToAdd, ...cRCollection];
    }
    return cRCollection;
  }
}
