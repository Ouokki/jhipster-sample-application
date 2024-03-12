import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConformite, NewConformite } from '../conformite.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConformite for edit and NewConformiteFormGroupInput for create.
 */
type ConformiteFormGroupInput = IConformite | PartialWithRequiredKeyOf<NewConformite>;

type ConformiteFormDefaults = Pick<NewConformite, 'id' | 'affichage'>;

type ConformiteFormGroupContent = {
  id: FormControl<IConformite['id'] | NewConformite['id']>;
  affichage: FormControl<IConformite['affichage']>;
  lienBonita: FormControl<IConformite['lienBonita']>;
};

export type ConformiteFormGroup = FormGroup<ConformiteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConformiteFormService {
  createConformiteFormGroup(conformite: ConformiteFormGroupInput = { id: null }): ConformiteFormGroup {
    const conformiteRawValue = {
      ...this.getFormDefaults(),
      ...conformite,
    };
    return new FormGroup<ConformiteFormGroupContent>({
      id: new FormControl(
        { value: conformiteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      affichage: new FormControl(conformiteRawValue.affichage),
      lienBonita: new FormControl(conformiteRawValue.lienBonita),
    });
  }

  getConformite(form: ConformiteFormGroup): IConformite | NewConformite {
    return form.getRawValue() as IConformite | NewConformite;
  }

  resetForm(form: ConformiteFormGroup, conformite: ConformiteFormGroupInput): void {
    const conformiteRawValue = { ...this.getFormDefaults(), ...conformite };
    form.reset(
      {
        ...conformiteRawValue,
        id: { value: conformiteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ConformiteFormDefaults {
    return {
      id: null,
      affichage: false,
    };
  }
}
