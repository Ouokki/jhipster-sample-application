import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IReferentielCR } from '../referentiel-cr.model';
import { ReferentielCRService } from '../service/referentiel-cr.service';
import { ReferentielCRFormService, ReferentielCRFormGroup } from './referentiel-cr-form.service';

@Component({
  standalone: true,
  selector: 'jhi-referentiel-cr-update',
  templateUrl: './referentiel-cr-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ReferentielCRUpdateComponent implements OnInit {
  isSaving = false;
  referentielCR: IReferentielCR | null = null;

  editForm: ReferentielCRFormGroup = this.referentielCRFormService.createReferentielCRFormGroup();

  constructor(
    protected referentielCRService: ReferentielCRService,
    protected referentielCRFormService: ReferentielCRFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ referentielCR }) => {
      this.referentielCR = referentielCR;
      if (referentielCR) {
        this.updateForm(referentielCR);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const referentielCR = this.referentielCRFormService.getReferentielCR(this.editForm);
    if (referentielCR.id !== null) {
      this.subscribeToSaveResponse(this.referentielCRService.update(referentielCR));
    } else {
      this.subscribeToSaveResponse(this.referentielCRService.create(referentielCR));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReferentielCR>>): void {
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

  protected updateForm(referentielCR: IReferentielCR): void {
    this.referentielCR = referentielCR;
    this.referentielCRFormService.resetForm(this.editForm, referentielCR);
  }
}
