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
  nomCommission: FormControl<ITarifCommercant['nomCommission']>;
  typeCommission: FormControl<ITarifCommercant['typeCommission']>;
  champMatrice: FormControl<ITarifCommercant['champMatrice']>;
  tarif: FormControl<ITarifCommercant['tarif']>;
  parametrage: FormControl<ITarifCommercant['parametrage']>;
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
      nomCommission: new FormControl(tarifCommercantRawValue.nomCommission),
      typeCommission: new FormControl(tarifCommercantRawValue.typeCommission),
      champMatrice: new FormControl(tarifCommercantRawValue.champMatrice),
      tarif: new FormControl(tarifCommercantRawValue.tarif),
      parametrage: new FormControl(tarifCommercantRawValue.parametrage),
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
