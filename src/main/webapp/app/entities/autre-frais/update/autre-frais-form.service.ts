import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAutreFrais, NewAutreFrais } from '../autre-frais.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAutreFrais for edit and NewAutreFraisFormGroupInput for create.
 */
type AutreFraisFormGroupInput = IAutreFrais | PartialWithRequiredKeyOf<NewAutreFrais>;

type AutreFraisFormDefaults = Pick<NewAutreFrais, 'id'>;

type AutreFraisFormGroupContent = {
  id: FormControl<IAutreFrais['id'] | NewAutreFrais['id']>;
  domaineFrais: FormControl<IAutreFrais['domaineFrais']>;
};

export type AutreFraisFormGroup = FormGroup<AutreFraisFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AutreFraisFormService {
  createAutreFraisFormGroup(autreFrais: AutreFraisFormGroupInput = { id: null }): AutreFraisFormGroup {
    const autreFraisRawValue = {
      ...this.getFormDefaults(),
      ...autreFrais,
    };
    return new FormGroup<AutreFraisFormGroupContent>({
      id: new FormControl(
        { value: autreFraisRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      domaineFrais: new FormControl(autreFraisRawValue.domaineFrais),
    });
  }

  getAutreFrais(form: AutreFraisFormGroup): IAutreFrais | NewAutreFrais {
    return form.getRawValue() as IAutreFrais | NewAutreFrais;
  }

  resetForm(form: AutreFraisFormGroup, autreFrais: AutreFraisFormGroupInput): void {
    const autreFraisRawValue = { ...this.getFormDefaults(), ...autreFrais };
    form.reset(
      {
        ...autreFraisRawValue,
        id: { value: autreFraisRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AutreFraisFormDefaults {
    return {
      id: null,
    };
  }
}
