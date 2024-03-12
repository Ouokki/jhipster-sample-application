import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITpe } from '../tpe.model';
import { TpeService } from '../service/tpe.service';

@Component({
  standalone: true,
  templateUrl: './tpe-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TpeDeleteDialogComponent {
  tpe?: ITpe;

  constructor(
    protected tpeService: TpeService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tpeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
