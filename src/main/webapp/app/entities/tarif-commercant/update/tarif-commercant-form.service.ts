import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITarifCommercant, NewTarifCommercant } from '../tarif-commercant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITarifCommercant for edit and NewTarifCommercantFormGroupInput for create.
 */
type TarifCommercantFormGroupInput = ITarifCommercant | PartialWithRequiredKeyOf<NewTarifCommercant>;

type TarifCommercantFormDefaults = Pick<NewTarifCommercant, 'id'>;

type TarifCommercantFormGroupContent = {
  id: FormControl<ITarifCommercant['id'] | NewTarifCommercant['id']>;
  typeCommission: FormControl<ITarifCommercant['typeCommission']>;
  tarif: FormControl<ITarifCommercant['tarif']>;
};

export type TarifCommercantFormGroup = FormGroup<TarifCommercantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TarifCommercantFormService {
  createTarifCommercantFormGroup(tarifCommercant: TarifCommercantFormGroupInput = { id: null }): TarifCommercantFormGroup {
    const tarifCommercantRawValue = {
      ...this.getFormDefaults(),
      ...tarifCommercant,
    };
    return new FormGroup<TarifCommercantFormGroupContent>({
      id: new FormControl(
        { value: tarifCommercantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      typeCommission: new FormControl(tarifCommercantRawValue.typeCommission),
      tarif: new FormControl(tarifCommercantRawValue.tarif),
    });
  }

  getTarifCommercant(form: TarifCommercantFormGroup): ITarifCommercant | NewTarifCommercant {
    return form.getRawValue() as ITarifCommercant | NewTarifCommercant;
  }

  resetForm(form: TarifCommercantFormGroup, tarifCommercant: TarifCommercantFormGroupInput): void {
    const tarifCommercantRawValue = { ...this.getFormDefaults(), ...tarifCommercant };
    form.reset(
      {
        ...tarifCommercantRawValue,
        id: { value: tarifCommercantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TarifCommercantFormDefaults {
    return {
      id: null,
    };
  }
}
