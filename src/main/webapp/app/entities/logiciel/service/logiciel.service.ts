import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILogiciel, NewLogiciel } from '../logiciel.model';

export type PartialUpdateLogiciel = Partial<ILogiciel> & Pick<ILogiciel, 'id'>;

export type EntityResponseType = HttpResponse<ILogiciel>;
export type EntityArrayResponseType = HttpResponse<ILogiciel[]>;

@Injectable({ providedIn: 'root' })
export class LogicielService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/logiciels');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(logiciel: NewLogiciel): Observable<EntityResponseType> {
    return this.http.post<ILogiciel>(this.resourceUrl, logiciel, { observe: 'response' });
  }

  update(logiciel: ILogiciel): Observable<EntityResponseType> {
    return this.http.put<ILogiciel>(`${this.resourceUrl}/${this.getLogicielIdentifier(logiciel)}`, logiciel, { observe: 'response' });
  }

  partialUpdate(logiciel: PartialUpdateLogiciel): Observable<EntityResponseType> {
    return this.http.patch<ILogiciel>(`${this.resourceUrl}/${this.getLogicielIdentifier(logiciel)}`, logiciel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILogiciel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILogiciel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLogicielIdentifier(logiciel: Pick<ILogiciel, 'id'>): number {
    return logiciel.id;
  }

  compareLogiciel(o1: Pick<ILogiciel, 'id'> | null, o2: Pick<ILogiciel, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogicielIdentifier(o1) === this.getLogicielIdentifier(o2) : o1 === o2;
  }

  addLogicielToCollectionIfMissing<Type extends Pick<ILogiciel, 'id'>>(
    logicielCollection: Type[],
    ...logicielsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logiciels: Type[] = logicielsToCheck.filter(isPresent);
    if (logiciels.length > 0) {
      const logicielCollectionIdentifiers = logicielCollection.map(logicielItem => this.getLogicielIdentifier(logicielItem)!);
      const logicielsToAdd = logiciels.filter(logicielItem => {
        const logicielIdentifier = this.getLogicielIdentifier(logicielItem);
        if (logicielCollectionIdentifiers.includes(logicielIdentifier)) {
          return false;
        }
        logicielCollectionIdentifiers.push(logicielIdentifier);
        return true;
      });
      return [...logicielsToAdd, ...logicielCollection];
    }
    return logicielCollection;
  }
}
