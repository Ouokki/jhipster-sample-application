import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOffreProduit, NewOffreProduit } from '../offre-produit.model';

export type PartialUpdateOffreProduit = Partial<IOffreProduit> & Pick<IOffreProduit, 'id'>;

export type EntityResponseType = HttpResponse<IOffreProduit>;
export type EntityArrayResponseType = HttpResponse<IOffreProduit[]>;

@Injectable({ providedIn: 'root' })
export class OffreProduitService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/offre-produits');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(offreProduit: NewOffreProduit): Observable<EntityResponseType> {
    return this.http.post<IOffreProduit>(this.resourceUrl, offreProduit, { observe: 'response' });
  }

  update(offreProduit: IOffreProduit): Observable<EntityResponseType> {
    return this.http.put<IOffreProduit>(`${this.resourceUrl}/${this.getOffreProduitIdentifier(offreProduit)}`, offreProduit, {
      observe: 'response',
    });
  }

  partialUpdate(offreProduit: PartialUpdateOffreProduit): Observable<EntityResponseType> {
    return this.http.patch<IOffreProduit>(`${this.resourceUrl}/${this.getOffreProduitIdentifier(offreProduit)}`, offreProduit, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOffreProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOffreProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOffreProduitIdentifier(offreProduit: Pick<IOffreProduit, 'id'>): number {
    return offreProduit.id;
  }

  compareOffreProduit(o1: Pick<IOffreProduit, 'id'> | null, o2: Pick<IOffreProduit, 'id'> | null): boolean {
    return o1 && o2 ? this.getOffreProduitIdentifier(o1) === this.getOffreProduitIdentifier(o2) : o1 === o2;
  }

  addOffreProduitToCollectionIfMissing<Type extends Pick<IOffreProduit, 'id'>>(
    offreProduitCollection: Type[],
    ...offreProduitsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const offreProduits: Type[] = offreProduitsToCheck.filter(isPresent);
    if (offreProduits.length > 0) {
      const offreProduitCollectionIdentifiers = offreProduitCollection.map(
        offreProduitItem => this.getOffreProduitIdentifier(offreProduitItem)!,
      );
      const offreProduitsToAdd = offreProduits.filter(offreProduitItem => {
        const offreProduitIdentifier = this.getOffreProduitIdentifier(offreProduitItem);
        if (offreProduitCollectionIdentifiers.includes(offreProduitIdentifier)) {
          return false;
        }
        offreProduitCollectionIdentifiers.push(offreProduitIdentifier);
        return true;
      });
      return [...offreProduitsToAdd, ...offreProduitCollection];
    }
    return offreProduitCollection;
  }
}
