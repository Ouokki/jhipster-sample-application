import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAutreFrais } from '../autre-frais.model';
import { AutreFraisService } from '../service/autre-frais.service';

@Component({
  standalone: true,
  templateUrl: './autre-frais-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AutreFraisDeleteDialogComponent {
  autreFrais?: IAutreFrais;

  constructor(
    protected autreFraisService: AutreFraisService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.autreFraisService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
