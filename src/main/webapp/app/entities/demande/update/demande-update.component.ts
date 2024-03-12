import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
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

  parametragesSharedCollection: IParametrage[] = [];

  editForm: DemandeFormGroup = this.demandeFormService.createDemandeFormGroup();

  constructor(
    protected demandeService: DemandeService,
    protected demandeFormService: DemandeFormService,
    protected parametrageService: ParametrageService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareParametrage = (o1: IParametrage | null, o2: IParametrage | null): boolean => this.parametrageService.compareParametrage(o1, o2);

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

    this.parametragesSharedCollection = this.parametrageService.addParametrageToCollectionIfMissing<IParametrage>(
      this.parametragesSharedCollection,
      demande.parametrage,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.parametrageService
      .query()
      .pipe(map((res: HttpResponse<IParametrage[]>) => res.body ?? []))
      .pipe(
        map((parametrages: IParametrage[]) =>
          this.parametrageService.addParametrageToCollectionIfMissing<IParametrage>(parametrages, this.demande?.parametrage),
        ),
      )
      .subscribe((parametrages: IParametrage[]) => (this.parametragesSharedCollection = parametrages));
  }
}
