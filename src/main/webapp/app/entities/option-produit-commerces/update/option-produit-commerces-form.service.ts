import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOptionProduitCommerces, NewOptionProduitCommerces } from '../option-produit-commerces.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOptionProduitCommerces for edit and NewOptionProduitCommercesFormGroupInput for create.
 */
type OptionProduitCommercesFormGroupInput = IOptionProduitCommerces | PartialWithRequiredKeyOf<NewOptionProduitCommerces>;

type OptionProduitCommercesFormDefaults = Pick<NewOptionProduitCommerces, 'id'>;

type OptionProduitCommercesFormGroupContent = {
  id: FormControl<IOptionProduitCommerces['id'] | NewOptionProduitCommerces['id']>;
  tarifReferenceOption: FormControl<IOptionProduitCommerces['tarifReferenceOption']>;
  tarif: FormControl<IOptionProduitCommerces['tarif']>;
  parametrage: FormControl<IOptionProduitCommerces['parametrage']>;
};

export type OptionProduitCommercesFormGroup = FormGroup<OptionProduitCommercesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OptionProduitCommercesFormService {
  createOptionProduitCommercesFormGroup(
    optionProduitCommerces: OptionProduitCommercesFormGroupInput = { id: null },
  ): OptionProduitCommercesFormGroup {
    const optionProduitCommercesRawValue = {
      ...this.getFormDefaults(),
      ...optionProduitCommerces,
    };
    return new FormGroup<OptionProduitCommercesFormGroupContent>({
      id: new FormControl(
        { value: optionProduitCommercesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tarifReferenceOption: new FormControl(optionProduitCommercesRawValue.tarifReferenceOption),
      tarif: new FormControl(optionProduitCommercesRawValue.tarif),
      parametrage: new FormControl(optionProduitCommercesRawValue.parametrage),
    });
  }

  getOptionProduitCommerces(form: OptionProduitCommercesFormGroup): IOptionProduitCommerces | NewOptionProduitCommerces {
    return form.getRawValue() as IOptionProduitCommerces | NewOptionProduitCommerces;
  }

  resetForm(form: OptionProduitCommercesFormGroup, optionProduitCommerces: OptionProduitCommercesFormGroupInput): void {
    const optionProduitCommercesRawValue = { ...this.getFormDefaults(), ...optionProduitCommerces };
    form.reset(
      {
        ...optionProduitCommercesRawValue,
        id: { value: optionProduitCommercesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OptionProduitCommercesFormDefaults {
    return {
      id: null,
    };
  }
}
