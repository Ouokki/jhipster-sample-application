import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITpe, NewTpe } from '../tpe.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITpe for edit and NewTpeFormGroupInput for create.
 */
type TpeFormGroupInput = ITpe | PartialWithRequiredKeyOf<NewTpe>;

type TpeFormDefaults = Pick<NewTpe, 'id'>;

type TpeFormGroupContent = {
  id: FormControl<ITpe['id'] | NewTpe['id']>;
  imageTpe: FormControl<ITpe['imageTpe']>;
  descriptif: FormControl<ITpe['descriptif']>;
};

export type TpeFormGroup = FormGroup<TpeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TpeFormService {
  createTpeFormGroup(tpe: TpeFormGroupInput = { id: null }): TpeFormGroup {
    const tpeRawValue = {
      ...this.getFormDefaults(),
      ...tpe,
    };
    return new FormGroup<TpeFormGroupContent>({
      id: new FormControl(
        { value: tpeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      imageTpe: new FormControl(tpeRawValue.imageTpe),
      descriptif: new FormControl(tpeRawValue.descriptif),
    });
  }

  getTpe(form: TpeFormGroup): ITpe | NewTpe {
    return form.getRawValue() as ITpe | NewTpe;
  }

  resetForm(form: TpeFormGroup, tpe: TpeFormGroupInput): void {
    const tpeRawValue = { ...this.getFormDefaults(), ...tpe };
    form.reset(
      {
        ...tpeRawValue,
        id: { value: tpeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TpeFormDefaults {
    return {
      id: null,
    };
  }
}
