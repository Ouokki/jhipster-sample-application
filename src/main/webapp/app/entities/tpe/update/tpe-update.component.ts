import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITpe } from '../tpe.model';
import { TpeService } from '../service/tpe.service';
import { TpeFormService, TpeFormGroup } from './tpe-form.service';

@Component({
  standalone: true,
  selector: 'jhi-tpe-update',
  templateUrl: './tpe-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TpeUpdateComponent implements OnInit {
  isSaving = false;
  tpe: ITpe | null = null;

  editForm: TpeFormGroup = this.tpeFormService.createTpeFormGroup();

  constructor(
    protected tpeService: TpeService,
    protected tpeFormService: TpeFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tpe }) => {
      this.tpe = tpe;
      if (tpe) {
        this.updateForm(tpe);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tpe = this.tpeFormService.getTpe(this.editForm);
    if (tpe.id !== null) {
      this.subscribeToSaveResponse(this.tpeService.update(tpe));
    } else {
      this.subscribeToSaveResponse(this.tpeService.create(tpe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITpe>>): void {
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

  protected updateForm(tpe: ITpe): void {
    this.tpe = tpe;
    this.tpeFormService.resetForm(this.editForm, tpe);
  }
}
