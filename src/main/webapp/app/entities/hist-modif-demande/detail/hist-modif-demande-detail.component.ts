import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IHistModifDemande } from '../hist-modif-demande.model';

@Component({
  standalone: true,
  selector: 'jhi-hist-modif-demande-detail',
  templateUrl: './hist-modif-demande-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class HistModifDemandeDetailComponent {
  @Input() histModifDemande: IHistModifDemande | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
