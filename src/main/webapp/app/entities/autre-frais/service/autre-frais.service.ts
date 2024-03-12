import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAutreFrais, NewAutreFrais } from '../autre-frais.model';

export type PartialUpdateAutreFrais = Partial<IAutreFrais> & Pick<IAutreFrais, 'id'>;

export type EntityResponseType = HttpResponse<IAutreFrais>;
export type EntityArrayResponseType = HttpResponse<IAutreFrais[]>;

@Injectable({ providedIn: 'root' })
export class AutreFraisService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/autre-frais');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(autreFrais: NewAutreFrais): Observable<EntityResponseType> {
    return this.http.post<IAutreFrais>(this.resourceUrl, autreFrais, { observe: 'response' });
  }

  update(autreFrais: IAutreFrais): Observable<EntityResponseType> {
    return this.http.put<IAutreFrais>(`${this.resourceUrl}/${this.getAutreFraisIdentifier(autreFrais)}`, autreFrais, {
      observe: 'response',
    });
  }

  partialUpdate(autreFrais: PartialUpdateAutreFrais): Observable<EntityResponseType> {
    return this.http.patch<IAutreFrais>(`${this.resourceUrl}/${this.getAutreFraisIdentifier(autreFrais)}`, autreFrais, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAutreFrais>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAutreFrais[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAutreFraisIdentifier(autreFrais: Pick<IAutreFrais, 'id'>): number {
    return autreFrais.id;
  }

  compareAutreFrais(o1: Pick<IAutreFrais, 'id'> | null, o2: Pick<IAutreFrais, 'id'> | null): boolean {
    return o1 && o2 ? this.getAutreFraisIdentifier(o1) === this.getAutreFraisIdentifier(o2) : o1 === o2;
  }

  addAutreFraisToCollectionIfMissing<Type extends Pick<IAutreFrais, 'id'>>(
    autreFraisCollection: Type[],
    ...autreFraisToCheck: (Type | null | undefined)[]
  ): Type[] {
    const autreFrais: Type[] = autreFraisToCheck.filter(isPresent);
    if (autreFrais.length > 0) {
      const autreFraisCollectionIdentifiers = autreFraisCollection.map(autreFraisItem => this.getAutreFraisIdentifier(autreFraisItem)!);
      const autreFraisToAdd = autreFrais.filter(autreFraisItem => {
        const autreFraisIdentifier = this.getAutreFraisIdentifier(autreFraisItem);
        if (autreFraisCollectionIdentifiers.includes(autreFraisIdentifier)) {
          return false;
        }
        autreFraisCollectionIdentifiers.push(autreFraisIdentifier);
        return true;
      });
      return [...autreFraisToAdd, ...autreFraisCollection];
    }
    return autreFraisCollection;
  }
}
