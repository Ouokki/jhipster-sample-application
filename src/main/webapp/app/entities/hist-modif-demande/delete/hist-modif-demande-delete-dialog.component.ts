import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHistModifDemande } from '../hist-modif-demande.model';
import { HistModifDemandeService } from '../service/hist-modif-demande.service';

@Component({
  standalone: true,
  templateUrl: './hist-modif-demande-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HistModifDemandeDeleteDialogComponent {
  histModifDemande?: IHistModifDemande;

  constructor(
    protected histModifDemandeService: HistModifDemandeService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.histModifDemandeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
