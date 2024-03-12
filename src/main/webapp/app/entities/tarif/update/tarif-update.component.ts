import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { TarifReferenceOptionService } from 'app/entities/tarif-reference-option/service/tarif-reference-option.service';
import { ITarif } from '../tarif.model';
import { TarifService } from '../service/tarif.service';
import { TarifFormService, TarifFormGroup } from './tarif-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tarif-update',
  templateUrl: './tarif-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TarifUpdateComponent implements OnInit {
  isSaving = false;
  tarif: ITarif | null = null;

  tarifReferenceOptionsCollection: ITarifReferenceOption[] = [];

  editForm: TarifFormGroup = this.tarifFormService.createTarifFormGroup();

  constructor(
    protected tarifService: TarifService,
    protected tarifFormService: TarifFormService,
    protected tarifReferenceOptionService: TarifReferenceOptionService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTarifReferenceOption = (o1: ITarifReferenceOption | null, o2: ITarifReferenceOption | null): boolean =>
    this.tarifReferenceOptionService.compareTarifReferenceOption(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarif }) => {
      this.tarif = tarif;
      if (tarif) {
        this.updateForm(tarif);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarif = this.tarifFormService.getTarif(this.editForm);
    if (tarif.id !== null) {
      this.subscribeToSaveResponse(this.tarifService.update(tarif));
    } else {
      this.subscribeToSaveResponse(this.tarifService.create(tarif));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarif>>): void {
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

  protected updateForm(tarif: ITarif): void {
    this.tarif = tarif;
    this.tarifFormService.resetForm(this.editForm, tarif);

    this.tarifReferenceOptionsCollection =
      this.tarifReferenceOptionService.addTarifReferenceOptionToCollectionIfMissing<ITarifReferenceOption>(
        this.tarifReferenceOptionsCollection,
        tarif.tarifReferenceOption,
      );
  }

  protected loadRelationshipsOptions(): void {
    this.tarifReferenceOptionService
      .query({ filter: 'tarif-is-null' })
      .pipe(map((res: HttpResponse<ITarifReferenceOption[]>) => res.body ?? []))
      .pipe(
        map((tarifReferenceOptions: ITarifReferenceOption[]) =>
          this.tarifReferenceOptionService.addTarifReferenceOptionToCollectionIfMissing<ITarifReferenceOption>(
            tarifReferenceOptions,
            this.tarif?.tarifReferenceOption,
          ),
        ),
      )
      .subscribe((tarifReferenceOptions: ITarifReferenceOption[]) => (this.tarifReferenceOptionsCollection = tarifReferenceOptions));
  }
}
