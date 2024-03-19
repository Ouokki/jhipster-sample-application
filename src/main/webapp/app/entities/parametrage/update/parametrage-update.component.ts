import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGarantie } from 'app/entities/garantie/garantie.model';
import { GarantieService } from 'app/entities/garantie/service/garantie.service';
import { IDemande } from 'app/entities/demande/demande.model';
import { DemandeService } from 'app/entities/demande/service/demande.service';
import { IConformite } from 'app/entities/conformite/conformite.model';
import { ConformiteService } from 'app/entities/conformite/service/conformite.service';
import { ParametrageService } from '../service/parametrage.service';
import { IParametrage } from '../parametrage.model';
import { ParametrageFormService, ParametrageFormGroup } from './parametrage-form.service';

@Component({
  standalone: true,
  selector: 'jhi-parametrage-update',
  templateUrl: './parametrage-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ParametrageUpdateComponent implements OnInit {
  isSaving = false;
  parametrage: IParametrage | null = null;

  garantiesCollection: IGarantie[] = [];
  demandesCollection: IDemande[] = [];
  conformitesCollection: IConformite[] = [];

  editForm: ParametrageFormGroup = this.parametrageFormService.createParametrageFormGroup();

  constructor(
    protected parametrageService: ParametrageService,
    protected parametrageFormService: ParametrageFormService,
    protected garantieService: GarantieService,
    protected demandeService: DemandeService,
    protected conformiteService: ConformiteService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareGarantie = (o1: IGarantie | null, o2: IGarantie | null): boolean => this.garantieService.compareGarantie(o1, o2);

  compareDemande = (o1: IDemande | null, o2: IDemande | null): boolean => this.demandeService.compareDemande(o1, o2);

  compareConformite = (o1: IConformite | null, o2: IConformite | null): boolean => this.conformiteService.compareConformite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametrage }) => {
      this.parametrage = parametrage;
      if (parametrage) {
        this.updateForm(parametrage);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parametrage = this.parametrageFormService.getParametrage(this.editForm);
    if (parametrage.id !== null) {
      this.subscribeToSaveResponse(this.parametrageService.update(parametrage));
    } else {
      this.subscribeToSaveResponse(this.parametrageService.create(parametrage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParametrage>>): void {
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

  protected updateForm(parametrage: IParametrage): void {
    this.parametrage = parametrage;
    this.parametrageFormService.resetForm(this.editForm, parametrage);

    this.garantiesCollection = this.garantieService.addGarantieToCollectionIfMissing<IGarantie>(
      this.garantiesCollection,
      parametrage.garantie,
    );
    this.demandesCollection = this.demandeService.addDemandeToCollectionIfMissing<IDemande>(this.demandesCollection, parametrage.demande);
    this.conformitesCollection = this.conformiteService.addConformiteToCollectionIfMissing<IConformite>(
      this.conformitesCollection,
      parametrage.conformite,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.garantieService
      .query({ filter: 'parametrage-is-null' })
      .pipe(map((res: HttpResponse<IGarantie[]>) => res.body ?? []))
      .pipe(
        map((garanties: IGarantie[]) =>
          this.garantieService.addGarantieToCollectionIfMissing<IGarantie>(garanties, this.parametrage?.garantie),
        ),
      )
      .subscribe((garanties: IGarantie[]) => (this.garantiesCollection = garanties));

    this.demandeService
      .query({ filter: 'parametrage-is-null' })
      .pipe(map((res: HttpResponse<IDemande[]>) => res.body ?? []))
      .pipe(
        map((demandes: IDemande[]) => this.demandeService.addDemandeToCollectionIfMissing<IDemande>(demandes, this.parametrage?.demande)),
      )
      .subscribe((demandes: IDemande[]) => (this.demandesCollection = demandes));

    this.conformiteService
      .query({ filter: 'parametrage-is-null' })
      .pipe(map((res: HttpResponse<IConformite[]>) => res.body ?? []))
      .pipe(
        map((conformites: IConformite[]) =>
          this.conformiteService.addConformiteToCollectionIfMissing<IConformite>(conformites, this.parametrage?.conformite),
        ),
      )
      .subscribe((conformites: IConformite[]) => (this.conformitesCollection = conformites));
  }
}
