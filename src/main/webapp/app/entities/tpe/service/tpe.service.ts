import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITpe, NewTpe } from '../tpe.model';

export type PartialUpdateTpe = Partial<ITpe> & Pick<ITpe, 'id'>;

export type EntityResponseType = HttpResponse<ITpe>;
export type EntityArrayResponseType = HttpResponse<ITpe[]>;

@Injectable({ providedIn: 'root' })
export class TpeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tpes');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tpe: NewTpe): Observable<EntityResponseType> {
    return this.http.post<ITpe>(this.resourceUrl, tpe, { observe: 'response' });
  }

  update(tpe: ITpe): Observable<EntityResponseType> {
    return this.http.put<ITpe>(`${this.resourceUrl}/${this.getTpeIdentifier(tpe)}`, tpe, { observe: 'response' });
  }

  partialUpdate(tpe: PartialUpdateTpe): Observable<EntityResponseType> {
    return this.http.patch<ITpe>(`${this.resourceUrl}/${this.getTpeIdentifier(tpe)}`, tpe, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITpe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITpe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTpeIdentifier(tpe: Pick<ITpe, 'id'>): number {
    return tpe.id;
  }

  compareTpe(o1: Pick<ITpe, 'id'> | null, o2: Pick<ITpe, 'id'> | null): boolean {
    return o1 && o2 ? this.getTpeIdentifier(o1) === this.getTpeIdentifier(o2) : o1 === o2;
  }

  addTpeToCollectionIfMissing<Type extends Pick<ITpe, 'id'>>(tpeCollection: Type[], ...tpesToCheck: (Type | null | undefined)[]): Type[] {
    const tpes: Type[] = tpesToCheck.filter(isPresent);
    if (tpes.length > 0) {
      const tpeCollectionIdentifiers = tpeCollection.map(tpeItem => this.getTpeIdentifier(tpeItem)!);
      const tpesToAdd = tpes.filter(tpeItem => {
        const tpeIdentifier = this.getTpeIdentifier(tpeItem);
        if (tpeCollectionIdentifiers.includes(tpeIdentifier)) {
          return false;
        }
        tpeCollectionIdentifiers.push(tpeIdentifier);
        return true;
      });
      return [...tpesToAdd, ...tpeCollection];
    }
    return tpeCollection;
  }
}
