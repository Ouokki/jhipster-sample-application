import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ILogiciel } from '../logiciel.model';
import { LogicielService } from '../service/logiciel.service';
import { LogicielFormService, LogicielFormGroup } from './logiciel-form.service';

@Component({
  standalone: true,
  selector: 'jhi-logiciel-update',
  templateUrl: './logiciel-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LogicielUpdateComponent implements OnInit {
  isSaving = false;
  logiciel: ILogiciel | null = null;

  editForm: LogicielFormGroup = this.logicielFormService.createLogicielFormGroup();

  constructor(
    protected logicielService: LogicielService,
    protected logicielFormService: LogicielFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logiciel }) => {
      this.logiciel = logiciel;
      if (logiciel) {
        this.updateForm(logiciel);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const logiciel = this.logicielFormService.getLogiciel(this.editForm);
    if (logiciel.id !== null) {
      this.subscribeToSaveResponse(this.logicielService.update(logiciel));
    } else {
      this.subscribeToSaveResponse(this.logicielService.create(logiciel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogiciel>>): void {
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

  protected updateForm(logiciel: ILogiciel): void {
    this.logiciel = logiciel;
    this.logicielFormService.resetForm(this.editForm, logiciel);
  }
}
