import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IReferentielCR } from '../referentiel-cr.model';
import { ReferentielCRService } from '../service/referentiel-cr.service';

@Component({
  standalone: true,
  templateUrl: './referentiel-cr-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ReferentielCRDeleteDialogComponent {
  referentielCR?: IReferentielCR;

  constructor(
    protected referentielCRService: ReferentielCRService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.referentielCRService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
