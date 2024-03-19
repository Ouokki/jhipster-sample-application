import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHistModifDemande, NewHistModifDemande } from '../hist-modif-demande.model';

export type PartialUpdateHistModifDemande = Partial<IHistModifDemande> & Pick<IHistModifDemande, 'id'>;

type RestOf<T extends IHistModifDemande | NewHistModifDemande> = Omit<T, 'dateModification'> & {
  dateModification?: string | null;
};

export type RestHistModifDemande = RestOf<IHistModifDemande>;

export type NewRestHistModifDemande = RestOf<NewHistModifDemande>;

export type PartialUpdateRestHistModifDemande = RestOf<PartialUpdateHistModifDemande>;

export type EntityResponseType = HttpResponse<IHistModifDemande>;
export type EntityArrayResponseType = HttpResponse<IHistModifDemande[]>;

@Injectable({ providedIn: 'root' })
export class HistModifDemandeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hist-modif-demandes');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(histModifDemande: NewHistModifDemande): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(histModifDemande);
    return this.http
      .post<RestHistModifDemande>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(histModifDemande: IHistModifDemande): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(histModifDemande);
    return this.http
      .put<RestHistModifDemande>(`${this.resourceUrl}/${this.getHistModifDemandeIdentifier(histModifDemande)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(histModifDemande: PartialUpdateHistModifDemande): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(histModifDemande);
    return this.http
      .patch<RestHistModifDemande>(`${this.resourceUrl}/${this.getHistModifDemandeIdentifier(histModifDemande)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHistModifDemande>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHistModifDemande[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHistModifDemandeIdentifier(histModifDemande: Pick<IHistModifDemande, 'id'>): number {
    return histModifDemande.id;
  }

  compareHistModifDemande(o1: Pick<IHistModifDemande, 'id'> | null, o2: Pick<IHistModifDemande, 'id'> | null): boolean {
    return o1 && o2 ? this.getHistModifDemandeIdentifier(o1) === this.getHistModifDemandeIdentifier(o2) : o1 === o2;
  }

  addHistModifDemandeToCollectionIfMissing<Type extends Pick<IHistModifDemande, 'id'>>(
    histModifDemandeCollection: Type[],
    ...histModifDemandesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const histModifDemandes: Type[] = histModifDemandesToCheck.filter(isPresent);
    if (histModifDemandes.length > 0) {
      const histModifDemandeCollectionIdentifiers = histModifDemandeCollection.map(
        histModifDemandeItem => this.getHistModifDemandeIdentifier(histModifDemandeItem)!,
      );
      const histModifDemandesToAdd = histModifDemandes.filter(histModifDemandeItem => {
        const histModifDemandeIdentifier = this.getHistModifDemandeIdentifier(histModifDemandeItem);
        if (histModifDemandeCollectionIdentifiers.includes(histModifDemandeIdentifier)) {
          return false;
        }
        histModifDemandeCollectionIdentifiers.push(histModifDemandeIdentifier);
        return true;
      });
      return [...histModifDemandesToAdd, ...histModifDemandeCollection];
    }
    return histModifDemandeCollection;
  }

  protected convertDateFromClient<T extends IHistModifDemande | NewHistModifDemande | PartialUpdateHistModifDemande>(
    histModifDemande: T,
  ): RestOf<T> {
    return {
      ...histModifDemande,
      dateModification: histModifDemande.dateModification?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restHistModifDemande: RestHistModifDemande): IHistModifDemande {
    return {
      ...restHistModifDemande,
      dateModification: restHistModifDemande.dateModification ? dayjs(restHistModifDemande.dateModification) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHistModifDemande>): HttpResponse<IHistModifDemande> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHistModifDemande[]>): HttpResponse<IHistModifDemande[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
