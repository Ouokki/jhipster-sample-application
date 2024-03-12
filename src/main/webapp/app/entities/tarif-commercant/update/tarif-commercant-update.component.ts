import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITarif } from 'app/entities/tarif/tarif.model';
import { TarifService } from 'app/entities/tarif/service/tarif.service';
import { TypeCommissionCommercant } from 'app/entities/enumerations/type-commission-commercant.model';
import { TarifCommercantService } from '../service/tarif-commercant.service';
import { ITarifCommercant } from '../tarif-commercant.model';
import { TarifCommercantFormService, TarifCommercantFormGroup } from './tarif-commercant-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tarif-commercant-update',
  templateUrl: './tarif-commercant-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TarifCommercantUpdateComponent implements OnInit {
  isSaving = false;
  tarifCommercant: ITarifCommercant | null = null;
  typeCommissionCommercantValues = Object.keys(TypeCommissionCommercant);

  tarifsCollection: ITarif[] = [];

  editForm: TarifCommercantFormGroup = this.tarifCommercantFormService.createTarifCommercantFormGroup();

  constructor(
    protected tarifCommercantService: TarifCommercantService,
    protected tarifCommercantFormService: TarifCommercantFormService,
    protected tarifService: TarifService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTarif = (o1: ITarif | null, o2: ITarif | null): boolean => this.tarifService.compareTarif(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarifCommercant }) => {
      this.tarifCommercant = tarifCommercant;
      if (tarifCommercant) {
        this.updateForm(tarifCommercant);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarifCommercant = this.tarifCommercantFormService.getTarifCommercant(this.editForm);
    if (tarifCommercant.id !== null) {
      this.subscribeToSaveResponse(this.tarifCommercantService.update(tarifCommercant));
    } else {
      this.subscribeToSaveResponse(this.tarifCommercantService.create(tarifCommercant));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarifCommercant>>): void {
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

  protected updateForm(tarifCommercant: ITarifCommercant): void {
    this.tarifCommercant = tarifCommercant;
    this.tarifCommercantFormService.resetForm(this.editForm, tarifCommercant);

    this.tarifsCollection = this.tarifService.addTarifToCollectionIfMissing<ITarif>(this.tarifsCollection, tarifCommercant.tarif);
  }

  protected loadRelationshipsOptions(): void {
    this.tarifService
      .query({ filter: 'tarifcommercant-is-null' })
      .pipe(map((res: HttpResponse<ITarif[]>) => res.body ?? []))
      .pipe(map((tarifs: ITarif[]) => this.tarifService.addTarifToCollectionIfMissing<ITarif>(tarifs, this.tarifCommercant?.tarif)))
      .subscribe((tarifs: ITarif[]) => (this.tarifsCollection = tarifs));
  }
}
