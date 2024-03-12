import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOffre } from '../offre.model';
import { OffreService } from '../service/offre.service';

@Component({
  standalone: true,
  templateUrl: './offre-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OffreDeleteDialogComponent {
  offre?: IOffre;

  constructor(
    protected offreService: OffreService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.offreService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
