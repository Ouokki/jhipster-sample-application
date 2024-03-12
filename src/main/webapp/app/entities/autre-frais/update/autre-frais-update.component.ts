import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DomaineFrais } from 'app/entities/enumerations/domaine-frais.model';
import { IAutreFrais } from '../autre-frais.model';
import { AutreFraisService } from '../service/autre-frais.service';
import { AutreFraisFormService, AutreFraisFormGroup } from './autre-frais-form.service';

@Component({
  standalone: true,
  selector: 'jhi-autre-frais-update',
  templateUrl: './autre-frais-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AutreFraisUpdateComponent implements OnInit {
  isSaving = false;
  autreFrais: IAutreFrais | null = null;
  domaineFraisValues = Object.keys(DomaineFrais);

  editForm: AutreFraisFormGroup = this.autreFraisFormService.createAutreFraisFormGroup();

  constructor(
    protected autreFraisService: AutreFraisService,
    protected autreFraisFormService: AutreFraisFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ autreFrais }) => {
      this.autreFrais = autreFrais;
      if (autreFrais) {
        this.updateForm(autreFrais);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const autreFrais = this.autreFraisFormService.getAutreFrais(this.editForm);
    if (autreFrais.id !== null) {
      this.subscribeToSaveResponse(this.autreFraisService.update(autreFrais));
    } else {
      this.subscribeToSaveResponse(this.autreFraisService.create(autreFrais));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAutreFrais>>): void {
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

  protected updateForm(autreFrais: IAutreFrais): void {
    this.autreFrais = autreFrais;
    this.autreFraisFormService.resetForm(this.editForm, autreFrais);
  }
}
