import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICR, NewCR } from '../cr.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICR for edit and NewCRFormGroupInput for create.
 */
type CRFormGroupInput = ICR | PartialWithRequiredKeyOf<NewCR>;

type CRFormDefaults = Pick<NewCR, 'id' | 'isAvem' | 'isAmex'>;

type CRFormGroupContent = {
  id: FormControl<ICR['id'] | NewCR['id']>;
  isAvem: FormControl<ICR['isAvem']>;
  isAmex: FormControl<ICR['isAmex']>;
  referentielCR: FormControl<ICR['referentielCR']>;
};

export type CRFormGroup = FormGroup<CRFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CRFormService {
  createCRFormGroup(cR: CRFormGroupInput = { id: null }): CRFormGroup {
    const cRRawValue = {
      ...this.getFormDefaults(),
      ...cR,
    };
    return new FormGroup<CRFormGroupContent>({
      id: new FormControl(
        { value: cRRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      isAvem: new FormControl(cRRawValue.isAvem),
      isAmex: new FormControl(cRRawValue.isAmex),
      referentielCR: new FormControl(cRRawValue.referentielCR),
    });
  }

  getCR(form: CRFormGroup): ICR | NewCR {
    return form.getRawValue() as ICR | NewCR;
  }

  resetForm(form: CRFormGroup, cR: CRFormGroupInput): void {
    const cRRawValue = { ...this.getFormDefaults(), ...cR };
    form.reset(
      {
        ...cRRawValue,
        id: { value: cRRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CRFormDefaults {
    return {
      id: null,
      isAvem: false,
      isAmex: false,
    };
  }
}
