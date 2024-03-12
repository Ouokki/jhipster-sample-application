import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReferentielCR, NewReferentielCR } from '../referentiel-cr.model';

export type PartialUpdateReferentielCR = Partial<IReferentielCR> & Pick<IReferentielCR, 'id'>;

export type EntityResponseType = HttpResponse<IReferentielCR>;
export type EntityArrayResponseType = HttpResponse<IReferentielCR[]>;

@Injectable({ providedIn: 'root' })
export class ReferentielCRService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/referentiel-crs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(referentielCR: NewReferentielCR): Observable<EntityResponseType> {
    return this.http.post<IReferentielCR>(this.resourceUrl, referentielCR, { observe: 'response' });
  }

  update(referentielCR: IReferentielCR): Observable<EntityResponseType> {
    return this.http.put<IReferentielCR>(`${this.resourceUrl}/${this.getReferentielCRIdentifier(referentielCR)}`, referentielCR, {
      observe: 'response',
    });
  }

  partialUpdate(referentielCR: PartialUpdateReferentielCR): Observable<EntityResponseType> {
    return this.http.patch<IReferentielCR>(`${this.resourceUrl}/${this.getReferentielCRIdentifier(referentielCR)}`, referentielCR, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReferentielCR>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReferentielCR[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getReferentielCRIdentifier(referentielCR: Pick<IReferentielCR, 'id'>): number {
    return referentielCR.id;
  }

  compareReferentielCR(o1: Pick<IReferentielCR, 'id'> | null, o2: Pick<IReferentielCR, 'id'> | null): boolean {
    return o1 && o2 ? this.getReferentielCRIdentifier(o1) === this.getReferentielCRIdentifier(o2) : o1 === o2;
  }

  addReferentielCRToCollectionIfMissing<Type extends Pick<IReferentielCR, 'id'>>(
    referentielCRCollection: Type[],
    ...referentielCRSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const referentielCRS: Type[] = referentielCRSToCheck.filter(isPresent);
    if (referentielCRS.length > 0) {
      const referentielCRCollectionIdentifiers = referentielCRCollection.map(
        referentielCRItem => this.getReferentielCRIdentifier(referentielCRItem)!,
      );
      const referentielCRSToAdd = referentielCRS.filter(referentielCRItem => {
        const referentielCRIdentifier = this.getReferentielCRIdentifier(referentielCRItem);
        if (referentielCRCollectionIdentifiers.includes(referentielCRIdentifier)) {
          return false;
        }
        referentielCRCollectionIdentifiers.push(referentielCRIdentifier);
        return true;
      });
      return [...referentielCRSToAdd, ...referentielCRCollection];
    }
    return referentielCRCollection;
  }
}
