import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILogiciel } from '../logiciel.model';
import { LogicielService } from '../service/logiciel.service';

@Component({
  standalone: true,
  templateUrl: './logiciel-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LogicielDeleteDialogComponent {
  logiciel?: ILogiciel;

  constructor(
    protected logicielService: LogicielService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.logicielService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
