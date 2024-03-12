import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ITarifReferenceOption } from '../tarif-reference-option.model';

@Component({
  standalone: true,
  selector: 'jhi-tarif-reference-option-detail',
  templateUrl: './tarif-reference-option-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TarifReferenceOptionDetailComponent {
  @Input() tarifReferenceOption: ITarifReferenceOption | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
