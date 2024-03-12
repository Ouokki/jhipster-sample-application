import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IGarantie } from '../garantie.model';
import { GarantieService } from '../service/garantie.service';
import { GarantieFormService, GarantieFormGroup } from './garantie-form.service';

@Component({
  standalone: true,
  selector: 'jhi-garantie-update',
  templateUrl: './garantie-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GarantieUpdateComponent implements OnInit {
  isSaving = false;
  garantie: IGarantie | null = null;

  editForm: GarantieFormGroup = this.garantieFormService.createGarantieFormGroup();

  constructor(
    protected garantieService: GarantieService,
    protected garantieFormService: GarantieFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ garantie }) => {
      this.garantie = garantie;
      if (garantie) {
        this.updateForm(garantie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const garantie = this.garantieFormService.getGarantie(this.editForm);
    if (garantie.id !== null) {
      this.subscribeToSaveResponse(this.garantieService.update(garantie));
    } else {
      this.subscribeToSaveResponse(this.garantieService.create(garantie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGarantie>>): void {
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

  protected updateForm(garantie: IGarantie): void {
    this.garantie = garantie;
    this.garantieFormService.resetForm(this.editForm, garantie);
  }
}
