import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
import { IOffre } from 'app/entities/offre/offre.model';
import { OffreService } from 'app/entities/offre/service/offre.service';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';
import { OffreProduitService } from '../service/offre-produit.service';
import { IOffreProduit } from '../offre-produit.model';
import { OffreProduitFormService, OffreProduitFormGroup } from './offre-produit-form.service';

@Component({
  standalone: true,
  selector: 'jhi-offre-produit-update',
  templateUrl: './offre-produit-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OffreProduitUpdateComponent implements OnInit {
  isSaving = false;
  offreProduit: IOffreProduit | null = null;

  parametragesCollection: IParametrage[] = [];
  offresSharedCollection: IOffre[] = [];
  produitsSharedCollection: IProduit[] = [];

  editForm: OffreProduitFormGroup = this.offreProduitFormService.createOffreProduitFormGroup();

  constructor(
    protected offreProduitService: OffreProduitService,
    protected offreProduitFormService: OffreProduitFormService,
    protected parametrageService: ParametrageService,
    protected offreService: OffreService,
    protected produitService: ProduitService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareParametrage = (o1: IParametrage | null, o2: IParametrage | null): boolean => this.parametrageService.compareParametrage(o1, o2);

  compareOffre = (o1: IOffre | null, o2: IOffre | null): boolean => this.offreService.compareOffre(o1, o2);

  compareProduit = (o1: IProduit | null, o2: IProduit | null): boolean => this.produitService.compareProduit(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offreProduit }) => {
      this.offreProduit = offreProduit;
      if (offreProduit) {
        this.updateForm(offreProduit);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offreProduit = this.offreProduitFormService.getOffreProduit(this.editForm);
    if (offreProduit.id !== null) {
      this.subscribeToSaveResponse(this.offreProduitService.update(offreProduit));
    } else {
      this.subscribeToSaveResponse(this.offreProduitService.create(offreProduit));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffreProduit>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(offreProduit: IOffreProduit): void {
    this.offreProduit = offreProduit;
    this.offreProduitFormService.resetForm(this.editForm, offreProduit);

    this.parametragesCollection = this.parametrageService.addParametrageToCollectionIfMissing<IParametrage>(
      this.parametragesCollection,
      offreProduit.parametrage,
    );
    this.offresSharedCollection = this.offreService.addOffreToCollectionIfMissing<IOffre>(
      this.offresSharedCollection,
      ...(offreProduit.offres ?? []),
    );
    this.produitsSharedCollection = this.produitService.addProduitToCollectionIfMissing<IProduit>(
      this.produitsSharedCollection,
      ...(offreProduit.produits ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.parametrageService
      .query({ filter: 'offreproduit-is-null' })
      .pipe(map((res: HttpResponse<IParametrage[]>) => res.body ?? []))
      .pipe(
        map((parametrages: IParametrage[]) =>
          this.parametrageService.addParametrageToCollectionIfMissing<IParametrage>(parametrages, this.offreProduit?.parametrage),
        ),
      )
      .subscribe((parametrages: IParametrage[]) => (this.parametragesCollection = parametrages));

    this.offreService
      .query()
      .pipe(map((res: HttpResponse<IOffre[]>) => res.body ?? []))
      .pipe(
        map((offres: IOffre[]) => this.offreService.addOffreToCollectionIfMissing<IOffre>(offres, ...(this.offreProduit?.offres ?? []))),
      )
      .subscribe((offres: IOffre[]) => (this.offresSharedCollection = offres));

    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduit[]>) => res.body ?? []))
      .pipe(
        map((produits: IProduit[]) =>
          this.produitService.addProduitToCollectionIfMissing<IProduit>(produits, ...(this.offreProduit?.produits ?? [])),
        ),
      )
      .subscribe((produits: IProduit[]) => (this.produitsSharedCollection = produits));
  }
}
