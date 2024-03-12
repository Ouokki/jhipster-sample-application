import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IOptionProduitCommerces } from '../option-produit-commerces.model';

@Component({
  standalone: true,
  selector: 'jhi-option-produit-commerces-detail',
  templateUrl: './option-produit-commerces-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class OptionProduitCommercesDetailComponent {
  @Input() optionProduitCommerces: IOptionProduitCommerces | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
