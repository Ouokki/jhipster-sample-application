import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IConformite } from '../conformite.model';
import { ConformiteService } from '../service/conformite.service';
import { ConformiteFormService, ConformiteFormGroup } from './conformite-form.service';

@Component({
  standalone: true,
  selector: 'jhi-conformite-update',
  templateUrl: './conformite-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ConformiteUpdateComponent implements OnInit {
  isSaving = false;
  conformite: IConformite | null = null;

  editForm: ConformiteFormGroup = this.conformiteFormService.createConformiteFormGroup();

  constructor(
    protected conformiteService: ConformiteService,
    protected conformiteFormService: ConformiteFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conformite }) => {
      this.conformite = conformite;
      if (conformite) {
        this.updateForm(conformite);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conformite = this.conformiteFormService.getConformite(this.editForm);
    if (conformite.id !== null) {
      this.subscribeToSaveResponse(this.conformiteService.update(conformite));
    } else {
      this.subscribeToSaveResponse(this.conformiteService.create(conformite));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConformite>>): void {
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

  protected updateForm(conformite: IConformite): void {
    this.conformite = conformite;
    this.conformiteFormService.resetForm(this.editForm, conformite);
  }
}
