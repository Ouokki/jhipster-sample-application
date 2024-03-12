import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFdo, NewFdo } from '../fdo.model';

export type PartialUpdateFdo = Partial<IFdo> & Pick<IFdo, 'id'>;

export type EntityResponseType = HttpResponse<IFdo>;
export type EntityArrayResponseType = HttpResponse<IFdo[]>;

@Injectable({ providedIn: 'root' })
export class FdoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fdos');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(fdo: NewFdo): Observable<EntityResponseType> {
    return this.http.post<IFdo>(this.resourceUrl, fdo, { observe: 'response' });
  }

  update(fdo: IFdo): Observable<EntityResponseType> {
    return this.http.put<IFdo>(`${this.resourceUrl}/${this.getFdoIdentifier(fdo)}`, fdo, { observe: 'response' });
  }

  partialUpdate(fdo: PartialUpdateFdo): Observable<EntityResponseType> {
    return this.http.patch<IFdo>(`${this.resourceUrl}/${this.getFdoIdentifier(fdo)}`, fdo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFdo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFdo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFdoIdentifier(fdo: Pick<IFdo, 'id'>): number {
    return fdo.id;
  }

  compareFdo(o1: Pick<IFdo, 'id'> | null, o2: Pick<IFdo, 'id'> | null): boolean {
    return o1 && o2 ? this.getFdoIdentifier(o1) === this.getFdoIdentifier(o2) : o1 === o2;
  }

  addFdoToCollectionIfMissing<Type extends Pick<IFdo, 'id'>>(fdoCollection: Type[], ...fdosToCheck: (Type | null | undefined)[]): Type[] {
    const fdos: Type[] = fdosToCheck.filter(isPresent);
    if (fdos.length > 0) {
      const fdoCollectionIdentifiers = fdoCollection.map(fdoItem => this.getFdoIdentifier(fdoItem)!);
      const fdosToAdd = fdos.filter(fdoItem => {
        const fdoIdentifier = this.getFdoIdentifier(fdoItem);
        if (fdoCollectionIdentifiers.includes(fdoIdentifier)) {
          return false;
        }
        fdoCollectionIdentifiers.push(fdoIdentifier);
        return true;
      });
      return [...fdosToAdd, ...fdoCollection];
    }
    return fdoCollection;
  }
}
