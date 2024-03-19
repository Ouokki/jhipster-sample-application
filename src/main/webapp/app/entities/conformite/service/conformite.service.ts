import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConformite, NewConformite } from '../conformite.model';

export type PartialUpdateConformite = Partial<IConformite> & Pick<IConformite, 'id'>;

export type EntityResponseType = HttpResponse<IConformite>;
export type EntityArrayResponseType = HttpResponse<IConformite[]>;

@Injectable({ providedIn: 'root' })
export class ConformiteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/conformites');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(conformite: NewConformite): Observable<EntityResponseType> {
    return this.http.post<IConformite>(this.resourceUrl, conformite, { observe: 'response' });
  }

  update(conformite: IConformite): Observable<EntityResponseType> {
    return this.http.put<IConformite>(`${this.resourceUrl}/${this.getConformiteIdentifier(conformite)}`, conformite, {
      observe: 'response',
    });
  }

  partialUpdate(conformite: PartialUpdateConformite): Observable<EntityResponseType> {
    return this.http.patch<IConformite>(`${this.resourceUrl}/${this.getConformiteIdentifier(conformite)}`, conformite, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConformite>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConformite[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConformiteIdentifier(conformite: Pick<IConformite, 'id'>): number {
    return conformite.id;
  }

  compareConformite(o1: Pick<IConformite, 'id'> | null, o2: Pick<IConformite, 'id'> | null): boolean {
    return o1 && o2 ? this.getConformiteIdentifier(o1) === this.getConformiteIdentifier(o2) : o1 === o2;
  }

  addConformiteToCollectionIfMissing<Type extends Pick<IConformite, 'id'>>(
    conformiteCollection: Type[],
    ...conformitesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const conformites: Type[] = conformitesToCheck.filter(isPresent);
    if (conformites.length > 0) {
      const conformiteCollectionIdentifiers = conformiteCollection.map(conformiteItem => this.getConformiteIdentifier(conformiteItem)!);
      const conformitesToAdd = conformites.filter(conformiteItem => {
        const conformiteIdentifier = this.getConformiteIdentifier(conformiteItem);
        if (conformiteCollectionIdentifiers.includes(conformiteIdentifier)) {
          return false;
        }
        conformiteCollectionIdentifiers.push(conformiteIdentifier);
        return true;
      });
      return [...conformitesToAdd, ...conformiteCollection];
    }
    return conformiteCollection;
  }
}
