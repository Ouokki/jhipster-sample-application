import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOffre, NewOffre } from '../offre.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOffre for edit and NewOffreFormGroupInput for create.
 */
type OffreFormGroupInput = IOffre | PartialWithRequiredKeyOf<NewOffre>;

type OffreFormDefaults = Pick<NewOffre, 'id'>;

type OffreFormGroupContent = {
  id: FormControl<IOffre['id'] | NewOffre['id']>;
  codeOffre: FormControl<IOffre['codeOffre']>;
  libelleOffre: FormControl<IOffre['libelleOffre']>;
  referenceEchangeAVEM: FormControl<IOffre['referenceEchangeAVEM']>;
  referenceEchangeCAPS: FormControl<IOffre['referenceEchangeCAPS']>;
};

export type OffreFormGroup = FormGroup<OffreFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OffreFormService {
  createOffreFormGroup(offre: OffreFormGroupInput = { id: null }): OffreFormGroup {
    const offreRawValue = {
      ...this.getFormDefaults(),
      ...offre,
    };
    return new FormGroup<OffreFormGroupContent>({
      id: new FormControl(
        { value: offreRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codeOffre: new FormControl(offreRawValue.codeOffre),
      libelleOffre: new FormControl(offreRawValue.libelleOffre),
      referenceEchangeAVEM: new FormControl(offreRawValue.referenceEchangeAVEM),
      referenceEchangeCAPS: new FormControl(offreRawValue.referenceEchangeCAPS),
    });
  }

  getOffre(form: OffreFormGroup): IOffre | NewOffre {
    return form.getRawValue() as IOffre | NewOffre;
  }

  resetForm(form: OffreFormGroup, offre: OffreFormGroupInput): void {
    const offreRawValue = { ...this.getFormDefaults(), ...offre };
    form.reset(
      {
        ...offreRawValue,
        id: { value: offreRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OffreFormDefaults {
    return {
      id: null,
    };
  }
}
