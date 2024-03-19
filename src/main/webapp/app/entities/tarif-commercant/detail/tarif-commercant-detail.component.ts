import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITarifCommercant } from '../tarif-commercant.model';

@Component({
  standalone: true,
  selector: 'jhi-tarif-commercant-detail',
  templateUrl: './tarif-commercant-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TarifCommercantDetailComponent {
  @Input() tarifCommercant: ITarifCommercant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
