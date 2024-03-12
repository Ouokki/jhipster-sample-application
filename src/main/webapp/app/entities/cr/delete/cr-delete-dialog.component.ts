import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICR } from '../cr.model';
import { CRService } from '../service/cr.service';

@Component({
  standalone: true,
  templateUrl: './cr-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CRDeleteDialogComponent {
  cR?: ICR;

  constructor(
    protected cRService: CRService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cRService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
