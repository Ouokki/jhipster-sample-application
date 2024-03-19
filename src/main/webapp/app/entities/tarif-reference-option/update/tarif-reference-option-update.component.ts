import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IReferenceOptionProduitCommerces } from 'app/entities/reference-option-produit-commerces/reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesService } from 'app/entities/reference-option-produit-commerces/service/reference-option-produit-commerces.service';
import { ITarifReferenceOption } from '../tarif-reference-option.model';
import { TarifReferenceOptionService } from '../service/tarif-reference-option.service';
import { TarifReferenceOptionFormService, TarifReferenceOptionFormGroup } from './tarif-reference-option-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tarif-reference-option-update',
  templateUrl: './tarif-reference-option-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TarifReferenceOptionUpdateComponent implements OnInit {
  isSaving = false;
  tarifReferenceOption: ITarifReferenceOption | null = null;

  referenceOptionProduitCommercesSharedCollection: IReferenceOptionProduitCommerces[] = [];

  editForm: TarifReferenceOptionFormGroup = this.tarifReferenceOptionFormService.createTarifReferenceOptionFormGroup();

  constructor(
    protected tarifReferenceOptionService: TarifReferenceOptionService,
    protected tarifReferenceOptionFormService: TarifReferenceOptionFormService,
    protected referenceOptionProduitCommercesService: ReferenceOptionProduitCommercesService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareReferenceOptionProduitCommerces = (
    o1: IReferenceOptionProduitCommerces | null,
    o2: IReferenceOptionProduitCommerces | null,
  ): boolean => this.referenceOptionProduitCommercesService.compareReferenceOptionProduitCommerces(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarifReferenceOption }) => {
      this.tarifReferenceOption = tarifReferenceOption;
      if (tarifReferenceOption) {
        this.updateForm(tarifReferenceOption);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarifReferenceOption = this.tarifReferenceOptionFormService.getTarifReferenceOption(this.editForm);
    if (tarifReferenceOption.id !== null) {
      this.subscribeToSaveResponse(this.tarifReferenceOptionService.update(tarifReferenceOption));
    } else {
      this.subscribeToSaveResponse(this.tarifReferenceOptionService.create(tarifReferenceOption));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarifReferenceOption>>): void {
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

  protected updateForm(tarifReferenceOption: ITarifReferenceOption): void {
    this.tarifReferenceOption = tarifReferenceOption;
    this.tarifReferenceOptionFormService.resetForm(this.editForm, tarifReferenceOption);

    this.referenceOptionProduitCommercesSharedCollection =
      this.referenceOptionProduitCommercesService.addReferenceOptionProduitCommercesToCollectionIfMissing<IReferenceOptionProduitCommerces>(
        this.referenceOptionProduitCommercesSharedCollection,
        ...(tarifReferenceOption.referenceOptionProduitCommerces ?? []),
      );
  }

  protected loadRelationshipsOptions(): void {
    this.referenceOptionProduitCommercesService
      .query()
      .pipe(map((res: HttpResponse<IReferenceOptionProduitCommerces[]>) => res.body ?? []))
      .pipe(
        map((referenceOptionProduitCommerces: IReferenceOptionProduitCommerces[]) =>
          this.referenceOptionProduitCommercesService.addReferenceOptionProduitCommercesToCollectionIfMissing<IReferenceOptionProduitCommerces>(
            referenceOptionProduitCommerces,
            ...(this.tarifReferenceOption?.referenceOptionProduitCommerces ?? []),
          ),
        ),
      )
      .subscribe(
        (referenceOptionProduitCommerces: IReferenceOptionProduitCommerces[]) =>
          (this.referenceOptionProduitCommercesSharedCollection = referenceOptionProduitCommerces),
      );
  }
}
