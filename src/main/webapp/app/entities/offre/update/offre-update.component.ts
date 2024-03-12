import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IOffre } from '../offre.model';
import { OffreService } from '../service/offre.service';
import { OffreFormService, OffreFormGroup } from './offre-form.service';

@Component({
  standalone: true,
  selector: 'jhi-offre-update',
  templateUrl: './offre-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OffreUpdateComponent implements OnInit {
  isSaving = false;
  offre: IOffre | null = null;

  editForm: OffreFormGroup = this.offreFormService.createOffreFormGroup();

  constructor(
    protected offreService: OffreService,
    protected offreFormService: OffreFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offre }) => {
      this.offre = offre;
      if (offre) {
        this.updateForm(offre);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offre = this.offreFormService.getOffre(this.editForm);
    if (offre.id !== null) {
      this.subscribeToSaveResponse(this.offreService.update(offre));
    } else {
      this.subscribeToSaveResponse(this.offreService.create(offre));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOffre>>): void {
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

  protected updateForm(offre: IOffre): void {
    this.offre = offre;
    this.offreFormService.resetForm(this.editForm, offre);
  }
}
