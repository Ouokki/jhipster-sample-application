import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITarifReferenceOption, NewTarifReferenceOption } from '../tarif-reference-option.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITarifReferenceOption for edit and NewTarifReferenceOptionFormGroupInput for create.
 */
type TarifReferenceOptionFormGroupInput = ITarifReferenceOption | PartialWithRequiredKeyOf<NewTarifReferenceOption>;

type TarifReferenceOptionFormDefaults = Pick<NewTarifReferenceOption, 'id' | 'referenceOptionProduitCommerces'>;

type TarifReferenceOptionFormGroupContent = {
  id: FormControl<ITarifReferenceOption['id'] | NewTarifReferenceOption['id']>;
  trigramme: FormControl<ITarifReferenceOption['trigramme']>;
  referenceOptionProduitCommerces: FormControl<ITarifReferenceOption['referenceOptionProduitCommerces']>;
};

export type TarifReferenceOptionFormGroup = FormGroup<TarifReferenceOptionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TarifReferenceOptionFormService {
  createTarifReferenceOptionFormGroup(
    tarifReferenceOption: TarifReferenceOptionFormGroupInput = { id: null },
  ): TarifReferenceOptionFormGroup {
    const tarifReferenceOptionRawValue = {
      ...this.getFormDefaults(),
      ...tarifReferenceOption,
    };
    return new FormGroup<TarifReferenceOptionFormGroupContent>({
      id: new FormControl(
        { value: tarifReferenceOptionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      trigramme: new FormControl(tarifReferenceOptionRawValue.trigramme),
      referenceOptionProduitCommerces: new FormControl(tarifReferenceOptionRawValue.referenceOptionProduitCommerces ?? []),
    });
  }

  getTarifReferenceOption(form: TarifReferenceOptionFormGroup): ITarifReferenceOption | NewTarifReferenceOption {
    return form.getRawValue() as ITarifReferenceOption | NewTarifReferenceOption;
  }

  resetForm(form: TarifReferenceOptionFormGroup, tarifReferenceOption: TarifReferenceOptionFormGroupInput): void {
    const tarifReferenceOptionRawValue = { ...this.getFormDefaults(), ...tarifReferenceOption };
    form.reset(
      {
        ...tarifReferenceOptionRawValue,
        id: { value: tarifReferenceOptionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TarifReferenceOptionFormDefaults {
    return {
      id: null,
      referenceOptionProduitCommerces: [],
    };
  }
}
