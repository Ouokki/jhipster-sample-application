import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IParametrage, NewParametrage } from '../parametrage.model';

export type PartialUpdateParametrage = Partial<IParametrage> & Pick<IParametrage, 'id'>;

export type EntityResponseType = HttpResponse<IParametrage>;
export type EntityArrayResponseType = HttpResponse<IParametrage[]>;

@Injectable({ providedIn: 'root' })
export class ParametrageService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/parametrages');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(parametrage: NewParametrage): Observable<EntityResponseType> {
    return this.http.post<IParametrage>(this.resourceUrl, parametrage, { observe: 'response' });
  }

  update(parametrage: IParametrage): Observable<EntityResponseType> {
    return this.http.put<IParametrage>(`${this.resourceUrl}/${this.getParametrageIdentifier(parametrage)}`, parametrage, {
      observe: 'response',
    });
  }

  partialUpdate(parametrage: PartialUpdateParametrage): Observable<EntityResponseType> {
    return this.http.patch<IParametrage>(`${this.resourceUrl}/${this.getParametrageIdentifier(parametrage)}`, parametrage, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParametrage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParametrage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getParametrageIdentifier(parametrage: Pick<IParametrage, 'id'>): number {
    return parametrage.id;
  }

  compareParametrage(o1: Pick<IParametrage, 'id'> | null, o2: Pick<IParametrage, 'id'> | null): boolean {
    return o1 && o2 ? this.getParametrageIdentifier(o1) === this.getParametrageIdentifier(o2) : o1 === o2;
  }

  addParametrageToCollectionIfMissing<Type extends Pick<IParametrage, 'id'>>(
    parametrageCollection: Type[],
    ...parametragesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const parametrages: Type[] = parametragesToCheck.filter(isPresent);
    if (parametrages.length > 0) {
      const parametrageCollectionIdentifiers = parametrageCollection.map(
        parametrageItem => this.getParametrageIdentifier(parametrageItem)!,
      );
      const parametragesToAdd = parametrages.filter(parametrageItem => {
        const parametrageIdentifier = this.getParametrageIdentifier(parametrageItem);
        if (parametrageCollectionIdentifiers.includes(parametrageIdentifier)) {
          return false;
        }
        parametrageCollectionIdentifiers.push(parametrageIdentifier);
        return true;
      });
      return [...parametragesToAdd, ...parametrageCollection];
    }
    return parametrageCollection;
  }
}
