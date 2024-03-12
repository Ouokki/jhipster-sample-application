import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IDemande } from 'app/entities/demande/demande.model';
import { DemandeService } from 'app/entities/demande/service/demande.service';
import { IHistModifDemande } from '../hist-modif-demande.model';
import { HistModifDemandeService } from '../service/hist-modif-demande.service';
import { HistModifDemandeFormService, HistModifDemandeFormGroup } from './hist-modif-demande-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hist-modif-demande-update',
  templateUrl: './hist-modif-demande-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HistModifDemandeUpdateComponent implements OnInit {
  isSaving = false;
  histModifDemande: IHistModifDemande | null = null;

  demandesSharedCollection: IDemande[] = [];

  editForm: HistModifDemandeFormGroup = this.histModifDemandeFormService.createHistModifDemandeFormGroup();

  constructor(
    protected histModifDemandeService: HistModifDemandeService,
    protected histModifDemandeFormService: HistModifDemandeFormService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareDemande = (o1: IDemande | null, o2: IDemande | null): boolean => this.demandeService.compareDemande(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ histModifDemande }) => {
      this.histModifDemande = histModifDemande;
      if (histModifDemande) {
        this.updateForm(histModifDemande);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const histModifDemande = this.histModifDemandeFormService.getHistModifDemande(this.editForm);
    if (histModifDemande.id !== null) {
      this.subscribeToSaveResponse(this.histModifDemandeService.update(histModifDemande));
    } else {
      this.subscribeToSaveResponse(this.histModifDemandeService.create(histModifDemande));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistModifDemande>>): void {
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

  protected updateForm(histModifDemande: IHistModifDemande): void {
    this.histModifDemande = histModifDemande;
    this.histModifDemandeFormService.resetForm(this.editForm, histModifDemande);

    this.demandesSharedCollection = this.demandeService.addDemandeToCollectionIfMissing<IDemande>(
      this.demandesSharedCollection,
      histModifDemande.demande,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.demandeService
      .query()
      .pipe(map((res: HttpResponse<IDemande[]>) => res.body ?? []))
      .pipe(
        map((demandes: IDemande[]) =>
          this.demandeService.addDemandeToCollectionIfMissing<IDemande>(demandes, this.histModifDemande?.demande),
        ),
      )
      .subscribe((demandes: IDemande[]) => (this.demandesSharedCollection = demandes));
  }
}
