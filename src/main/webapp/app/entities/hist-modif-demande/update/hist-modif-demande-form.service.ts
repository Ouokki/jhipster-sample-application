import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHistModifDemande, NewHistModifDemande } from '../hist-modif-demande.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHistModifDemande for edit and NewHistModifDemandeFormGroupInput for create.
 */
type HistModifDemandeFormGroupInput = IHistModifDemande | PartialWithRequiredKeyOf<NewHistModifDemande>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IHistModifDemande | NewHistModifDemande> = Omit<T, 'dateModification'> & {
  dateModification?: string | null;
};

type HistModifDemandeFormRawValue = FormValueOf<IHistModifDemande>;

type NewHistModifDemandeFormRawValue = FormValueOf<NewHistModifDemande>;

type HistModifDemandeFormDefaults = Pick<NewHistModifDemande, 'id' | 'dateModification'>;

type HistModifDemandeFormGroupContent = {
  id: FormControl<HistModifDemandeFormRawValue['id'] | NewHistModifDemande['id']>;
  dateModification: FormControl<HistModifDemandeFormRawValue['dateModification']>;
  typeModification: FormControl<HistModifDemandeFormRawValue['typeModification']>;
  detailsModifications: FormControl<HistModifDemandeFormRawValue['detailsModifications']>;
  demande: FormControl<HistModifDemandeFormRawValue['demande']>;
};

export type HistModifDemandeFormGroup = FormGroup<HistModifDemandeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HistModifDemandeFormService {
  createHistModifDemandeFormGroup(histModifDemande: HistModifDemandeFormGroupInput = { id: null }): HistModifDemandeFormGroup {
    const histModifDemandeRawValue = this.convertHistModifDemandeToHistModifDemandeRawValue({
      ...this.getFormDefaults(),
      ...histModifDemande,
    });
    return new FormGroup<HistModifDemandeFormGroupContent>({
      id: new FormControl(
        { value: histModifDemandeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      dateModification: new FormControl(histModifDemandeRawValue.dateModification),
      typeModification: new FormControl(histModifDemandeRawValue.typeModification),
      detailsModifications: new FormControl(histModifDemandeRawValue.detailsModifications),
      demande: new FormControl(histModifDemandeRawValue.demande),
    });
  }

  getHistModifDemande(form: HistModifDemandeFormGroup): IHistModifDemande | NewHistModifDemande {
    return this.convertHistModifDemandeRawValueToHistModifDemande(
      form.getRawValue() as HistModifDemandeFormRawValue | NewHistModifDemandeFormRawValue,
    );
  }

  resetForm(form: HistModifDemandeFormGroup, histModifDemande: HistModifDemandeFormGroupInput): void {
    const histModifDemandeRawValue = this.convertHistModifDemandeToHistModifDemandeRawValue({
      ...this.getFormDefaults(),
      ...histModifDemande,
    });
    form.reset(
      {
        ...histModifDemandeRawValue,
        id: { value: histModifDemandeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HistModifDemandeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateModification: currentTime,
    };
  }

  private convertHistModifDemandeRawValueToHistModifDemande(
    rawHistModifDemande: HistModifDemandeFormRawValue | NewHistModifDemandeFormRawValue,
  ): IHistModifDemande | NewHistModifDemande {
    return {
      ...rawHistModifDemande,
      dateModification: dayjs(rawHistModifDemande.dateModification, DATE_TIME_FORMAT),
    };
  }

  private convertHistModifDemandeToHistModifDemandeRawValue(
    histModifDemande: IHistModifDemande | (Partial<NewHistModifDemande> & HistModifDemandeFormDefaults),
  ): HistModifDemandeFormRawValue | PartialWithRequiredKeyOf<NewHistModifDemandeFormRawValue> {
    return {
      ...histModifDemande,
      dateModification: histModifDemande.dateModification ? histModifDemande.dateModification.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
