import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IReferentielCR, NewReferentielCR } from '../referentiel-cr.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IReferentielCR for edit and NewReferentielCRFormGroupInput for create.
 */
type ReferentielCRFormGroupInput = IReferentielCR | PartialWithRequiredKeyOf<NewReferentielCR>;

type ReferentielCRFormDefaults = Pick<NewReferentielCR, 'id'>;

type ReferentielCRFormGroupContent = {
  id: FormControl<IReferentielCR['id'] | NewReferentielCR['id']>;
  nomCR: FormControl<IReferentielCR['nomCR']>;
  numeroCR: FormControl<IReferentielCR['numeroCR']>;
};

export type ReferentielCRFormGroup = FormGroup<ReferentielCRFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ReferentielCRFormService {
  createReferentielCRFormGroup(referentielCR: ReferentielCRFormGroupInput = { id: null }): ReferentielCRFormGroup {
    const referentielCRRawValue = {
      ...this.getFormDefaults(),
      ...referentielCR,
    };
    return new FormGroup<ReferentielCRFormGroupContent>({
      id: new FormControl(
        { value: referentielCRRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nomCR: new FormControl(referentielCRRawValue.nomCR),
      numeroCR: new FormControl(referentielCRRawValue.numeroCR),
    });
  }

  getReferentielCR(form: ReferentielCRFormGroup): IReferentielCR | NewReferentielCR {
    return form.getRawValue() as IReferentielCR | NewReferentielCR;
  }

  resetForm(form: ReferentielCRFormGroup, referentielCR: ReferentielCRFormGroupInput): void {
    const referentielCRRawValue = { ...this.getFormDefaults(), ...referentielCR };
    form.reset(
      {
        ...referentielCRRawValue,
        id: { value: referentielCRRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ReferentielCRFormDefaults {
    return {
      id: null,
    };
  }
}
