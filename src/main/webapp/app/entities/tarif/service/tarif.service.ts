import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITarif, NewTarif } from '../tarif.model';

export type PartialUpdateTarif = Partial<ITarif> & Pick<ITarif, 'id'>;

export type EntityResponseType = HttpResponse<ITarif>;
export type EntityArrayResponseType = HttpResponse<ITarif[]>;

@Injectable({ providedIn: 'root' })
export class TarifService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tarifs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tarif: NewTarif): Observable<EntityResponseType> {
    return this.http.post<ITarif>(this.resourceUrl, tarif, { observe: 'response' });
  }

  update(tarif: ITarif): Observable<EntityResponseType> {
    return this.http.put<ITarif>(`${this.resourceUrl}/${this.getTarifIdentifier(tarif)}`, tarif, { observe: 'response' });
  }

  partialUpdate(tarif: PartialUpdateTarif): Observable<EntityResponseType> {
    return this.http.patch<ITarif>(`${this.resourceUrl}/${this.getTarifIdentifier(tarif)}`, tarif, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITarif>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITarif[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTarifIdentifier(tarif: Pick<ITarif, 'id'>): number {
    return tarif.id;
  }

  compareTarif(o1: Pick<ITarif, 'id'> | null, o2: Pick<ITarif, 'id'> | null): boolean {
    return o1 && o2 ? this.getTarifIdentifier(o1) === this.getTarifIdentifier(o2) : o1 === o2;
  }

  addTarifToCollectionIfMissing<Type extends Pick<ITarif, 'id'>>(
    tarifCollection: Type[],
    ...tarifsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tarifs: Type[] = tarifsToCheck.filter(isPresent);
    if (tarifs.length > 0) {
      const tarifCollectionIdentifiers = tarifCollection.map(tarifItem => this.getTarifIdentifier(tarifItem)!);
      const tarifsToAdd = tarifs.filter(tarifItem => {
        const tarifIdentifier = this.getTarifIdentifier(tarifItem);
        if (tarifCollectionIdentifiers.includes(tarifIdentifier)) {
          return false;
        }
        tarifCollectionIdentifiers.push(tarifIdentifier);
        return true;
      });
      return [...tarifsToAdd, ...tarifCollection];
    }
    return tarifCollection;
  }
}
