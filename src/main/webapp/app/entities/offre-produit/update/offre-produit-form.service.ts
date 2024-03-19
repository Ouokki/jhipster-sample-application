import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IOffreProduit, NewOffreProduit } from '../offre-produit.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOffreProduit for edit and NewOffreProduitFormGroupInput for create.
 */
type OffreProduitFormGroupInput = IOffreProduit | PartialWithRequiredKeyOf<NewOffreProduit>;

type OffreProduitFormDefaults = Pick<NewOffreProduit, 'id' | 'activeProd' | 'activeNEHOM' | 'activeVMOA' | 'activeDEVTU'>;

type OffreProduitFormGroupContent = {
  id: FormControl<IOffreProduit['id'] | NewOffreProduit['id']>;
  activeProd: FormControl<IOffreProduit['activeProd']>;
  activeNEHOM: FormControl<IOffreProduit['activeNEHOM']>;
  activeVMOA: FormControl<IOffreProduit['activeVMOA']>;
  activeDEVTU: FormControl<IOffreProduit['activeDEVTU']>;
  parametrage: FormControl<IOffreProduit['parametrage']>;
  cr: FormControl<IOffreProduit['cr']>;
  offre: FormControl<IOffreProduit['offre']>;
  produit: FormControl<IOffreProduit['produit']>;
};

export type OffreProduitFormGroup = FormGroup<OffreProduitFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OffreProduitFormService {
  createOffreProduitFormGroup(offreProduit: OffreProduitFormGroupInput = { id: null }): OffreProduitFormGroup {
    const offreProduitRawValue = {
      ...this.getFormDefaults(),
      ...offreProduit,
    };
    return new FormGroup<OffreProduitFormGroupContent>({
      id: new FormControl(
        { value: offreProduitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      activeProd: new FormControl(offreProduitRawValue.activeProd),
      activeNEHOM: new FormControl(offreProduitRawValue.activeNEHOM),
      activeVMOA: new FormControl(offreProduitRawValue.activeVMOA),
      activeDEVTU: new FormControl(offreProduitRawValue.activeDEVTU),
      parametrage: new FormControl(offreProduitRawValue.parametrage),
      cr: new FormControl(offreProduitRawValue.cr),
      offre: new FormControl(offreProduitRawValue.offre),
      produit: new FormControl(offreProduitRawValue.produit),
    });
  }

  getOffreProduit(form: OffreProduitFormGroup): IOffreProduit | NewOffreProduit {
    return form.getRawValue() as IOffreProduit | NewOffreProduit;
  }

  resetForm(form: OffreProduitFormGroup, offreProduit: OffreProduitFormGroupInput): void {
    const offreProduitRawValue = { ...this.getFormDefaults(), ...offreProduit };
    form.reset(
      {
        ...offreProduitRawValue,
        id: { value: offreProduitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OffreProduitFormDefaults {
    return {
      id: null,
      activeProd: false,
      activeNEHOM: false,
      activeVMOA: false,
      activeDEVTU: false,
    };
  }
}
