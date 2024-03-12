import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITarif } from '../tarif.model';
import { TarifService } from '../service/tarif.service';

@Component({
  standalone: true,
  templateUrl: './tarif-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TarifDeleteDialogComponent {
  tarif?: ITarif;

  constructor(
    protected tarifService: TarifService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tarifService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
