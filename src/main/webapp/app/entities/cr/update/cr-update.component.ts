import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IReferentielCR } from 'app/entities/referentiel-cr/referentiel-cr.model';
import { ReferentielCRService } from 'app/entities/referentiel-cr/service/referentiel-cr.service';
import { IOffreProduit } from 'app/entities/offre-produit/offre-produit.model';
import { OffreProduitService } from 'app/entities/offre-produit/service/offre-produit.service';
import { CRService } from '../service/cr.service';
import { ICR } from '../cr.model';
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

  referentielCRSSharedCollection: IReferentielCR[] = [];
  offreProduitsSharedCollection: IOffreProduit[] = [];

  editForm: CRFormGroup = this.cRFormService.createCRFormGroup();

  constructor(
    protected cRService: CRService,
    protected cRFormService: CRFormService,
    protected referentielCRService: ReferentielCRService,
    protected offreProduitService: OffreProduitService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareReferentielCR = (o1: IReferentielCR | null, o2: IReferentielCR | null): boolean =>
    this.referentielCRService.compareReferentielCR(o1, o2);

  compareOffreProduit = (o1: IOffreProduit | null, o2: IOffreProduit | null): boolean =>
    this.offreProduitService.compareOffreProduit(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cR }) => {
      this.cR = cR;
      if (cR) {
        this.updateForm(cR);
      }

      this.loadRelationshipsOptions();
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

    this.referentielCRSSharedCollection = this.referentielCRService.addReferentielCRToCollectionIfMissing<IReferentielCR>(
      this.referentielCRSSharedCollection,
      cR.referentielCR,
    );
    this.offreProduitsSharedCollection = this.offreProduitService.addOffreProduitToCollectionIfMissing<IOffreProduit>(
      this.offreProduitsSharedCollection,
      cR.offreProduit,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.referentielCRService
      .query()
      .pipe(map((res: HttpResponse<IReferentielCR[]>) => res.body ?? []))
      .pipe(
        map((referentielCRS: IReferentielCR[]) =>
          this.referentielCRService.addReferentielCRToCollectionIfMissing<IReferentielCR>(referentielCRS, this.cR?.referentielCR),
        ),
      )
      .subscribe((referentielCRS: IReferentielCR[]) => (this.referentielCRSSharedCollection = referentielCRS));

    this.offreProduitService
      .query()
      .pipe(map((res: HttpResponse<IOffreProduit[]>) => res.body ?? []))
      .pipe(
        map((offreProduits: IOffreProduit[]) =>
          this.offreProduitService.addOffreProduitToCollectionIfMissing<IOffreProduit>(offreProduits, this.cR?.offreProduit),
        ),
      )
      .subscribe((offreProduits: IOffreProduit[]) => (this.offreProduitsSharedCollection = offreProduits));
  }
}
