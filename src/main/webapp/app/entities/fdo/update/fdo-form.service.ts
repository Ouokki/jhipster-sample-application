import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFdo, NewFdo } from '../fdo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFdo for edit and NewFdoFormGroupInput for create.
 */
type FdoFormGroupInput = IFdo | PartialWithRequiredKeyOf<NewFdo>;

type FdoFormDefaults = Pick<NewFdo, 'id'>;

type FdoFormGroupContent = {
  id: FormControl<IFdo['id'] | NewFdo['id']>;
};

export type FdoFormGroup = FormGroup<FdoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FdoFormService {
  createFdoFormGroup(fdo: FdoFormGroupInput = { id: null }): FdoFormGroup {
    const fdoRawValue = {
      ...this.getFormDefaults(),
      ...fdo,
    };
    return new FormGroup<FdoFormGroupContent>({
      id: new FormControl(
        { value: fdoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
    });
  }

  getFdo(form: FdoFormGroup): IFdo | NewFdo {
    return form.getRawValue() as IFdo | NewFdo;
  }

  resetForm(form: FdoFormGroup, fdo: FdoFormGroupInput): void {
    const fdoRawValue = { ...this.getFormDefaults(), ...fdo };
    form.reset(
      {
        ...fdoRawValue,
        id: { value: fdoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FdoFormDefaults {
    return {
      id: null,
    };
  }
}
