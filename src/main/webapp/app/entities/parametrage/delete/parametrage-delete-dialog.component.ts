import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IParametrage } from '../parametrage.model';
import { ParametrageService } from '../service/parametrage.service';

@Component({
  standalone: true,
  templateUrl: './parametrage-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ParametrageDeleteDialogComponent {
  parametrage?: IParametrage;

  constructor(
    protected parametrageService: ParametrageService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parametrageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
