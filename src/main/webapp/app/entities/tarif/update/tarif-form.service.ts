import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITarif, NewTarif } from '../tarif.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITarif for edit and NewTarifFormGroupInput for create.
 */
type TarifFormGroupInput = ITarif | PartialWithRequiredKeyOf<NewTarif>;

type TarifFormDefaults = Pick<NewTarif, 'id'>;

type TarifFormGroupContent = {
  id: FormControl<ITarif['id'] | NewTarif['id']>;
  tarifParDefaut: FormControl<ITarif['tarifParDefaut']>;
  tarifMinimum: FormControl<ITarif['tarifMinimum']>;
  tarifMaximum: FormControl<ITarif['tarifMaximum']>;
  unite: FormControl<ITarif['unite']>;
  tarifReferenceOption: FormControl<ITarif['tarifReferenceOption']>;
};

export type TarifFormGroup = FormGroup<TarifFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TarifFormService {
  createTarifFormGroup(tarif: TarifFormGroupInput = { id: null }): TarifFormGroup {
    const tarifRawValue = {
      ...this.getFormDefaults(),
      ...tarif,
    };
    return new FormGroup<TarifFormGroupContent>({
      id: new FormControl(
        { value: tarifRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tarifParDefaut: new FormControl(tarifRawValue.tarifParDefaut),
      tarifMinimum: new FormControl(tarifRawValue.tarifMinimum),
      tarifMaximum: new FormControl(tarifRawValue.tarifMaximum),
      unite: new FormControl(tarifRawValue.unite),
      tarifReferenceOption: new FormControl(tarifRawValue.tarifReferenceOption),
    });
  }

  getTarif(form: TarifFormGroup): ITarif | NewTarif {
    return form.getRawValue() as ITarif | NewTarif;
  }

  resetForm(form: TarifFormGroup, tarif: TarifFormGroupInput): void {
    const tarifRawValue = { ...this.getFormDefaults(), ...tarif };
    form.reset(
      {
        ...tarifRawValue,
        id: { value: tarifRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TarifFormDefaults {
    return {
      id: null,
    };
  }
}
