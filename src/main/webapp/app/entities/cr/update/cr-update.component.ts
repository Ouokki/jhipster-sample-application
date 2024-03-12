import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICR } from '../cr.model';
import { CRService } from '../service/cr.service';
import { CRFormService, CRFormGroup } from './cr-form.service';

@Component({
  standalone: true,
  selector: 'jhi-cr-update',
  templateUrl: './cr-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CRUpdateComponent implements OnInit {
  isSaving = false;
  cR: ICR | null = null;

  editForm: CRFormGroup = this.cRFormService.createCRFormGroup();

  constructor(
    protected cRService: CRService,
    protected cRFormService: CRFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cR }) => {
      this.cR = cR;
      if (cR) {
        this.updateForm(cR);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cR = this.cRFormService.getCR(this.editForm);
    if (cR.id !== null) {
      this.subscribeToSaveResponse(this.cRService.update(cR));
    } else {
      this.subscribeToSaveResponse(this.cRService.create(cR));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICR>>): void {
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

  protected updateForm(cR: ICR): void {
    this.cR = cR;
    this.cRFormService.resetForm(this.editForm, cR);
  }
}
