import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILogiciel, NewLogiciel } from '../logiciel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILogiciel for edit and NewLogicielFormGroupInput for create.
 */
type LogicielFormGroupInput = ILogiciel | PartialWithRequiredKeyOf<NewLogiciel>;

type LogicielFormDefaults = Pick<NewLogiciel, 'id' | 'parDefault'>;

type LogicielFormGroupContent = {
  id: FormControl<ILogiciel['id'] | NewLogiciel['id']>;
  parDefault: FormControl<ILogiciel['parDefault']>;
};

export type LogicielFormGroup = FormGroup<LogicielFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LogicielFormService {
  createLogicielFormGroup(logiciel: LogicielFormGroupInput = { id: null }): LogicielFormGroup {
    const logicielRawValue = {
      ...this.getFormDefaults(),
      ...logiciel,
    };
    return new FormGroup<LogicielFormGroupContent>({
      id: new FormControl(
        { value: logicielRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      parDefault: new FormControl(logicielRawValue.parDefault),
    });
  }

  getLogiciel(form: LogicielFormGroup): ILogiciel | NewLogiciel {
    return form.getRawValue() as ILogiciel | NewLogiciel;
  }

  resetForm(form: LogicielFormGroup, logiciel: LogicielFormGroupInput): void {
    const logicielRawValue = { ...this.getFormDefaults(), ...logiciel };
    form.reset(
      {
        ...logicielRawValue,
        id: { value: logicielRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LogicielFormDefaults {
    return {
      id: null,
      parDefault: false,
    };
  }
}
