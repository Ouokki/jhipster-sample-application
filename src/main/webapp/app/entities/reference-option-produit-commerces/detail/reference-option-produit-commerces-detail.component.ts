import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';

@Component({
  standalone: true,
  selector: 'jhi-reference-option-produit-commerces-detail',
  templateUrl: './reference-option-produit-commerces-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ReferenceOptionProduitCommercesDetailComponent {
  @Input() referenceOptionProduitCommerces: IReferenceOptionProduitCommerces | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
