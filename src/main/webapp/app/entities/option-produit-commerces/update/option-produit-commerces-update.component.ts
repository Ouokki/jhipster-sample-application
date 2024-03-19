import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITarifReferenceOption } from 'app/entities/tarif-reference-option/tarif-reference-option.model';
import { TarifReferenceOptionService } from 'app/entities/tarif-reference-option/service/tarif-reference-option.service';
import { ITarif } from 'app/entities/tarif/tarif.model';
import { TarifService } from 'app/entities/tarif/service/tarif.service';
import { IParametrage } from 'app/entities/parametrage/parametrage.model';
import { ParametrageService } from 'app/entities/parametrage/service/parametrage.service';
import { OptionProduitCommercesService } from '../service/option-produit-commerces.service';
import { IOptionProduitCommerces } from '../option-produit-commerces.model';
import { OptionProduitCommercesFormService, OptionProduitCommercesFormGroup } from './option-produit-commerces-form.service';

@Component({
  standalone: true,
  selector: 'jhi-option-produit-commerces-update',
  templateUrl: './option-produit-commerces-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OptionProduitCommercesUpdateComponent implements OnInit {
  isSaving = false;
  optionProduitCommerces: IOptionProduitCommerces | null = null;

  tarifReferenceOptionsCollection: ITarifReferenceOption[] = [];
  tarifsCollection: ITarif[] = [];
  parametragesSharedCollection: IParametrage[] = [];

  editForm: OptionProduitCommercesFormGroup = this.optionProduitCommercesFormService.createOptionProduitCommercesFormGroup();

  constructor(
    protected optionProduitCommercesService: OptionProduitCommercesService,
    protected optionProduitCommercesFormService: OptionProduitCommercesFormService,
    protected tarifReferenceOptionService: TarifReferenceOptionService,
    protected tarifService: TarifService,
    protected parametrageService: ParametrageService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareTarifReferenceOption = (o1: ITarifReferenceOption | null, o2: ITarifReferenceOption | null): boolean =>
    this.tarifReferenceOptionService.compareTarifReferenceOption(o1, o2);

  compareTarif = (o1: ITarif | null, o2: ITarif | null): boolean => this.tarifService.compareTarif(o1, o2);

  compareParametrage = (o1: IParametrage | null, o2: IParametrage | null): boolean => this.parametrageService.compareParametrage(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ optionProduitCommerces }) => {
      this.optionProduitCommerces = optionProduitCommerces;
      if (optionProduitCommerces) {
        this.updateForm(optionProduitCommerces);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const optionProduitCommerces = this.optionProduitCommercesFormService.getOptionProduitCommerces(this.editForm);
    if (optionProduitCommerces.id !== null) {
      this.subscribeToSaveResponse(this.optionProduitCommercesService.update(optionProduitCommerces));
    } else {
      this.subscribeToSaveResponse(this.optionProduitCommercesService.create(optionProduitCommerces));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOptionProduitCommerces>>): void {
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

  protected updateForm(optionProduitCommerces: IOptionProduitCommerces): void {
    this.optionProduitCommerces = optionProduitCommerces;
    this.optionProduitCommercesFormService.resetForm(this.editForm, optionProduitCommerces);

    this.tarifReferenceOptionsCollection =
      this.tarifReferenceOptionService.addTarifReferenceOptionToCollectionIfMissing<ITarifReferenceOption>(
        this.tarifReferenceOptionsCollection,
        optionProduitCommerces.tarifReferenceOption,
      );
    this.tarifsCollection = this.tarifService.addTarifToCollectionIfMissing<ITarif>(this.tarifsCollection, optionProduitCommerces.tarif);
    this.parametragesSharedCollection = this.parametrageService.addParametrageToCollectionIfMissing<IParametrage>(
      this.parametragesSharedCollection,
      optionProduitCommerces.parametrage,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tarifReferenceOptionService
      .query({ filter: 'optionproduitcommerces-is-null' })
      .pipe(map((res: HttpResponse<ITarifReferenceOption[]>) => res.body ?? []))
      .pipe(
        map((tarifReferenceOptions: ITarifReferenceOption[]) =>
          this.tarifReferenceOptionService.addTarifReferenceOptionToCollectionIfMissing<ITarifReferenceOption>(
            tarifReferenceOptions,
            this.optionProduitCommerces?.tarifReferenceOption,
          ),
        ),
      )
      .subscribe((tarifReferenceOptions: ITarifReferenceOption[]) => (this.tarifReferenceOptionsCollection = tarifReferenceOptions));

    this.tarifService
      .query({ filter: 'optionproduitcommerces-is-null' })
      .pipe(map((res: HttpResponse<ITarif[]>) => res.body ?? []))
      .pipe(map((tarifs: ITarif[]) => this.tarifService.addTarifToCollectionIfMissing<ITarif>(tarifs, this.optionProduitCommerces?.tarif)))
      .subscribe((tarifs: ITarif[]) => (this.tarifsCollection = tarifs));

    this.parametrageService
      .query()
      .pipe(map((res: HttpResponse<IParametrage[]>) => res.body ?? []))
      .pipe(
        map((parametrages: IParametrage[]) =>
          this.parametrageService.addParametrageToCollectionIfMissing<IParametrage>(parametrages, this.optionProduitCommerces?.parametrage),
        ),
      )
      .subscribe((parametrages: IParametrage[]) => (this.parametragesSharedCollection = parametrages));
  }
}
