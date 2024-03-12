import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITarifCommercant, NewTarifCommercant } from '../tarif-commercant.model';

export type PartialUpdateTarifCommercant = Partial<ITarifCommercant> & Pick<ITarifCommercant, 'id'>;

export type EntityResponseType = HttpResponse<ITarifCommercant>;
export type EntityArrayResponseType = HttpResponse<ITarifCommercant[]>;

@Injectable({ providedIn: 'root' })
export class TarifCommercantService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tarif-commercants');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tarifCommercant: NewTarifCommercant): Observable<EntityResponseType> {
    return this.http.post<ITarifCommercant>(this.resourceUrl, tarifCommercant, { observe: 'response' });
  }

  update(tarifCommercant: ITarifCommercant): Observable<EntityResponseType> {
    return this.http.put<ITarifCommercant>(`${this.resourceUrl}/${this.getTarifCommercantIdentifier(tarifCommercant)}`, tarifCommercant, {
      observe: 'response',
    });
  }

  partialUpdate(tarifCommercant: PartialUpdateTarifCommercant): Observable<EntityResponseType> {
    return this.http.patch<ITarifCommercant>(`${this.resourceUrl}/${this.getTarifCommercantIdentifier(tarifCommercant)}`, tarifCommercant, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITarifCommercant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITarifCommercant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTarifCommercantIdentifier(tarifCommercant: Pick<ITarifCommercant, 'id'>): number {
    return tarifCommercant.id;
  }

  compareTarifCommercant(o1: Pick<ITarifCommercant, 'id'> | null, o2: Pick<ITarifCommercant, 'id'> | null): boolean {
    return o1 && o2 ? this.getTarifCommercantIdentifier(o1) === this.getTarifCommercantIdentifier(o2) : o1 === o2;
  }

  addTarifCommercantToCollectionIfMissing<Type extends Pick<ITarifCommercant, 'id'>>(
    tarifCommercantCollection: Type[],
    ...tarifCommercantsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tarifCommercants: Type[] = tarifCommercantsToCheck.filter(isPresent);
    if (tarifCommercants.length > 0) {
      const tarifCommercantCollectionIdentifiers = tarifCommercantCollection.map(
        tarifCommercantItem => this.getTarifCommercantIdentifier(tarifCommercantItem)!,
      );
      const tarifCommercantsToAdd = tarifCommercants.filter(tarifCommercantItem => {
        const tarifCommercantIdentifier = this.getTarifCommercantIdentifier(tarifCommercantItem);
        if (tarifCommercantCollectionIdentifiers.includes(tarifCommercantIdentifier)) {
          return false;
        }
        tarifCommercantCollectionIdentifiers.push(tarifCommercantIdentifier);
        return true;
      });
      return [...tarifCommercantsToAdd, ...tarifCommercantCollection];
    }
    return tarifCommercantCollection;
  }
}
