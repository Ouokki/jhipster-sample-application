import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFdo } from '../fdo.model';
import { FdoService } from '../service/fdo.service';

@Component({
  standalone: true,
  templateUrl: './fdo-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FdoDeleteDialogComponent {
  fdo?: IFdo;

  constructor(
    protected fdoService: FdoService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fdoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
