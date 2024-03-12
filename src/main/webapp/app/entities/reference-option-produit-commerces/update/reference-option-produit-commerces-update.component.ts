import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesService } from '../service/reference-option-produit-commerces.service';
import {
  ReferenceOptionProduitCommercesFormService,
  ReferenceOptionProduitCommercesFormGroup,
} from './reference-option-produit-commerces-form.service';

@Component({
  standalone: true,
  selector: 'jhi-reference-option-produit-commerces-update',
  templateUrl: './reference-option-produit-commerces-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ReferenceOptionProduitCommercesUpdateComponent implements OnInit {
  isSaving = false;
  referenceOptionProduitCommerces: IReferenceOptionProduitCommerces | null = null;

  editForm: ReferenceOptionProduitCommercesFormGroup =
    this.referenceOptionProduitCommercesFormService.createReferenceOptionProduitCommercesFormGroup();

  constructor(
    protected referenceOptionProduitCommercesService: ReferenceOptionProduitCommercesService,
    protected referenceOptionProduitCommercesFormService: ReferenceOptionProduitCommercesFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ referenceOptionProduitCommerces }) => {
      this.referenceOptionProduitCommerces = referenceOptionProduitCommerces;
      if (referenceOptionProduitCommerces) {
        this.updateForm(referenceOptionProduitCommerces);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const referenceOptionProduitCommerces = this.referenceOptionProduitCommercesFormService.getReferenceOptionProduitCommerces(
      this.editForm,
    );
    if (referenceOptionProduitCommerces.id !== null) {
      this.subscribeToSaveResponse(this.referenceOptionProduitCommercesService.update(referenceOptionProduitCommerces));
    } else {
      this.subscribeToSaveResponse(this.referenceOptionProduitCommercesService.create(referenceOptionProduitCommerces));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReferenceOptionProduitCommerces>>): void {
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

  protected updateForm(referenceOptionProduitCommerces: IReferenceOptionProduitCommerces): void {
    this.referenceOptionProduitCommerces = referenceOptionProduitCommerces;
    this.referenceOptionProduitCommercesFormService.resetForm(this.editForm, referenceOptionProduitCommerces);
  }
}
