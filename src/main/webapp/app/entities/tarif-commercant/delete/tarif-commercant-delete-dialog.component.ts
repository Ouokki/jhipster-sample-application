import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITarifCommercant } from '../tarif-commercant.model';
import { TarifCommercantService } from '../service/tarif-commercant.service';

@Component({
  standalone: true,
  templateUrl: './tarif-commercant-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TarifCommercantDeleteDialogComponent {
  tarifCommercant?: ITarifCommercant;

  constructor(
    protected tarifCommercantService: TarifCommercantService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tarifCommercantService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
