import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IHistModifDemande } from 'app/entities/hist-modif-demande/hist-modif-demande.model';
import { HistModifDemandeService } from 'app/entities/hist-modif-demande/service/hist-modif-demande.service';
import { IDemande } from '../demande.model';
import { DemandeService } from '../service/demande.service';
import { DemandeFormService, DemandeFormGroup } from './demande-form.service';

@Component({
  standalone: true,
  selector: 'jhi-demande-update',
  templateUrl: './demande-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DemandeUpdateComponent implements OnInit {
  isSaving = false;
  demande: IDemande | null = null;

  histModifDemandesSharedCollection: IHistModifDemande[] = [];

  editForm: DemandeFormGroup = this.demandeFormService.createDemandeFormGroup();

  constructor(
    protected demandeService: DemandeService,
    protected demandeFormService: DemandeFormService,
    protected histModifDemandeService: HistModifDemandeService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareHistModifDemande = (o1: IHistModifDemande | null, o2: IHistModifDemande | null): boolean =>
    this.histModifDemandeService.compareHistModifDemande(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      this.demande = demande;
      if (demande) {
        this.updateForm(demande);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demande = this.demandeFormService.getDemande(this.editForm);
    if (demande.id !== null) {
      this.subscribeToSaveResponse(this.demandeService.update(demande));
    } else {
      this.subscribeToSaveResponse(this.demandeService.create(demande));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemande>>): void {
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

  protected updateForm(demande: IDemande): void {
    this.demande = demande;
    this.demandeFormService.resetForm(this.editForm, demande);

    this.histModifDemandesSharedCollection = this.histModifDemandeService.addHistModifDemandeToCollectionIfMissing<IHistModifDemande>(
      this.histModifDemandesSharedCollection,
      demande.histModifDemande,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.histModifDemandeService
      .query()
      .pipe(map((res: HttpResponse<IHistModifDemande[]>) => res.body ?? []))
      .pipe(
        map((histModifDemandes: IHistModifDemande[]) =>
          this.histModifDemandeService.addHistModifDemandeToCollectionIfMissing<IHistModifDemande>(
            histModifDemandes,
            this.demande?.histModifDemande,
          ),
        ),
      )
      .subscribe((histModifDemandes: IHistModifDemande[]) => (this.histModifDemandesSharedCollection = histModifDemandes));
  }
}
