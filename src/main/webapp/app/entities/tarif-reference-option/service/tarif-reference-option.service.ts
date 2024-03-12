import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITarifReferenceOption, NewTarifReferenceOption } from '../tarif-reference-option.model';

export type PartialUpdateTarifReferenceOption = Partial<ITarifReferenceOption> & Pick<ITarifReferenceOption, 'id'>;

export type EntityResponseType = HttpResponse<ITarifReferenceOption>;
export type EntityArrayResponseType = HttpResponse<ITarifReferenceOption[]>;

@Injectable({ providedIn: 'root' })
export class TarifReferenceOptionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tarif-reference-options');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(tarifReferenceOption: NewTarifReferenceOption): Observable<EntityResponseType> {
    return this.http.post<ITarifReferenceOption>(this.resourceUrl, tarifReferenceOption, { observe: 'response' });
  }

  update(tarifReferenceOption: ITarifReferenceOption): Observable<EntityResponseType> {
    return this.http.put<ITarifReferenceOption>(
      `${this.resourceUrl}/${this.getTarifReferenceOptionIdentifier(tarifReferenceOption)}`,
      tarifReferenceOption,
      { observe: 'response' },
    );
  }

  partialUpdate(tarifReferenceOption: PartialUpdateTarifReferenceOption): Observable<EntityResponseType> {
    return this.http.patch<ITarifReferenceOption>(
      `${this.resourceUrl}/${this.getTarifReferenceOptionIdentifier(tarifReferenceOption)}`,
      tarifReferenceOption,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITarifReferenceOption>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITarifReferenceOption[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTarifReferenceOptionIdentifier(tarifReferenceOption: Pick<ITarifReferenceOption, 'id'>): number {
    return tarifReferenceOption.id;
  }

  compareTarifReferenceOption(o1: Pick<ITarifReferenceOption, 'id'> | null, o2: Pick<ITarifReferenceOption, 'id'> | null): boolean {
    return o1 && o2 ? this.getTarifReferenceOptionIdentifier(o1) === this.getTarifReferenceOptionIdentifier(o2) : o1 === o2;
  }

  addTarifReferenceOptionToCollectionIfMissing<Type extends Pick<ITarifReferenceOption, 'id'>>(
    tarifReferenceOptionCollection: Type[],
    ...tarifReferenceOptionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tarifReferenceOptions: Type[] = tarifReferenceOptionsToCheck.filter(isPresent);
    if (tarifReferenceOptions.length > 0) {
      const tarifReferenceOptionCollectionIdentifiers = tarifReferenceOptionCollection.map(
        tarifReferenceOptionItem => this.getTarifReferenceOptionIdentifier(tarifReferenceOptionItem)!,
      );
      const tarifReferenceOptionsToAdd = tarifReferenceOptions.filter(tarifReferenceOptionItem => {
        const tarifReferenceOptionIdentifier = this.getTarifReferenceOptionIdentifier(tarifReferenceOptionItem);
        if (tarifReferenceOptionCollectionIdentifiers.includes(tarifReferenceOptionIdentifier)) {
          return false;
        }
        tarifReferenceOptionCollectionIdentifiers.push(tarifReferenceOptionIdentifier);
        return true;
      });
      return [...tarifReferenceOptionsToAdd, ...tarifReferenceOptionCollection];
    }
    return tarifReferenceOptionCollection;
  }
}
