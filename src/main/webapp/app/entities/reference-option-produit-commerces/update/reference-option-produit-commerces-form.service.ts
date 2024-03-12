import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReferenceOptionProduitCommerces, NewReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReferenceOptionProduitCommerces for edit and NewReferenceOptionProduitCommercesFormGroupInput for create.
 */
type ReferenceOptionProduitCommercesFormGroupInput =
  | IReferenceOptionProduitCommerces
  | PartialWithRequiredKeyOf<NewReferenceOptionProduitCommerces>;

type ReferenceOptionProduitCommercesFormDefaults = Pick<NewReferenceOptionProduitCommerces, 'id'>;

type ReferenceOptionProduitCommercesFormGroupContent = {
  id: FormControl<IReferenceOptionProduitCommerces['id'] | NewReferenceOptionProduitCommerces['id']>;
  codeOptionProduit: FormControl<IReferenceOptionProduitCommerces['codeOptionProduit']>;
  libelleOptionProduit: FormControl<IReferenceOptionProduitCommerces['libelleOptionProduit']>;
};

export type ReferenceOptionProduitCommercesFormGroup = FormGroup<ReferenceOptionProduitCommercesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReferenceOptionProduitCommercesFormService {
  createReferenceOptionProduitCommercesFormGroup(
    referenceOptionProduitCommerces: ReferenceOptionProduitCommercesFormGroupInput = { id: null },
  ): ReferenceOptionProduitCommercesFormGroup {
    const referenceOptionProduitCommercesRawValue = {
      ...this.getFormDefaults(),
      ...referenceOptionProduitCommerces,
    };
    return new FormGroup<ReferenceOptionProduitCommercesFormGroupContent>({
      id: new FormControl(
        { value: referenceOptionProduitCommercesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codeOptionProduit: new FormControl(referenceOptionProduitCommercesRawValue.codeOptionProduit),
      libelleOptionProduit: new FormControl(referenceOptionProduitCommercesRawValue.libelleOptionProduit),
    });
  }

  getReferenceOptionProduitCommerces(
    form: ReferenceOptionProduitCommercesFormGroup,
  ): IReferenceOptionProduitCommerces | NewReferenceOptionProduitCommerces {
    return form.getRawValue() as IReferenceOptionProduitCommerces | NewReferenceOptionProduitCommerces;
  }

  resetForm(
    form: ReferenceOptionProduitCommercesFormGroup,
    referenceOptionProduitCommerces: ReferenceOptionProduitCommercesFormGroupInput,
  ): void {
    const referenceOptionProduitCommercesRawValue = { ...this.getFormDefaults(), ...referenceOptionProduitCommerces };
    form.reset(
      {
        ...referenceOptionProduitCommercesRawValue,
        id: { value: referenceOptionProduitCommercesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReferenceOptionProduitCommercesFormDefaults {
    return {
      id: null,
    };
  }
}
