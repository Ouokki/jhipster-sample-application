import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFdo } from '../fdo.model';
import { FdoService } from '../service/fdo.service';
import { FdoFormService, FdoFormGroup } from './fdo-form.service';

@Component({
  standalone: true,
  selector: 'jhi-fdo-update',
  templateUrl: './fdo-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FdoUpdateComponent implements OnInit {
  isSaving = false;
  fdo: IFdo | null = null;

  editForm: FdoFormGroup = this.fdoFormService.createFdoFormGroup();

  constructor(
    protected fdoService: FdoService,
    protected fdoFormService: FdoFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fdo }) => {
      this.fdo = fdo;
      if (fdo) {
        this.updateForm(fdo);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fdo = this.fdoFormService.getFdo(this.editForm);
    if (fdo.id !== null) {
      this.subscribeToSaveResponse(this.fdoService.update(fdo));
    } else {
      this.subscribeToSaveResponse(this.fdoService.create(fdo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFdo>>): void {
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

  protected updateForm(fdo: IFdo): void {
    this.fdo = fdo;
    this.fdoFormService.resetForm(this.editForm, fdo);
  }
}
