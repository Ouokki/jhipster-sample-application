import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IConformite } from '../conformite.model';
import { ConformiteService } from '../service/conformite.service';

@Component({
  standalone: true,
  templateUrl: './conformite-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ConformiteDeleteDialogComponent {
  conformite?: IConformite;

  constructor(
    protected conformiteService: ConformiteService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conformiteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
