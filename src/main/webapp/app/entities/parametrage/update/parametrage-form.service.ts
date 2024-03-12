import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IParametrage, NewParametrage } from '../parametrage.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IParametrage for edit and NewParametrageFormGroupInput for create.
 */
type ParametrageFormGroupInput = IParametrage | PartialWithRequiredKeyOf<NewParametrage>;

type ParametrageFormDefaults = Pick<NewParametrage, 'id'>;

type ParametrageFormGroupContent = {
  id: FormControl<IParametrage['id'] | NewParametrage['id']>;
  garantie: FormControl<IParametrage['garantie']>;
  demande: FormControl<IParametrage['demande']>;
  tarifCommercant: FormControl<IParametrage['tarifCommercant']>;
  optionProduitCommerces: FormControl<IParametrage['optionProduitCommerces']>;
  conformite: FormControl<IParametrage['conformite']>;
};

export type ParametrageFormGroup = FormGroup<ParametrageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ParametrageFormService {
  createParametrageFormGroup(parametrage: ParametrageFormGroupInput = { id: null }): ParametrageFormGroup {
    const parametrageRawValue = {
      ...this.getFormDefaults(),
      ...parametrage,
    };
    return new FormGroup<ParametrageFormGroupContent>({
      id: new FormControl(
        { value: parametrageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      garantie: new FormControl(parametrageRawValue.garantie),
      demande: new FormControl(parametrageRawValue.demande),
      tarifCommercant: new FormControl(parametrageRawValue.tarifCommercant),
      optionProduitCommerces: new FormControl(parametrageRawValue.optionProduitCommerces),
      conformite: new FormControl(parametrageRawValue.conformite),
    });
  }

  getParametrage(form: ParametrageFormGroup): IParametrage | NewParametrage {
    return form.getRawValue() as IParametrage | NewParametrage;
  }

  resetForm(form: ParametrageFormGroup, parametrage: ParametrageFormGroupInput): void {
    const parametrageRawValue = { ...this.getFormDefaults(), ...parametrage };
    form.reset(
      {
        ...parametrageRawValue,
        id: { value: parametrageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ParametrageFormDefaults {
    return {
      id: null,
    };
  }
}
