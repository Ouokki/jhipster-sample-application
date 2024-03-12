import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITarifReferenceOption } from '../tarif-reference-option.model';
import { TarifReferenceOptionService } from '../service/tarif-reference-option.service';

@Component({
  standalone: true,
  templateUrl: './tarif-reference-option-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TarifReferenceOptionDeleteDialogComponent {
  tarifReferenceOption?: ITarifReferenceOption;

  constructor(
    protected tarifReferenceOptionService: TarifReferenceOptionService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tarifReferenceOptionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
