import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOption } from '../option.model';
import { OptionService } from '../service/option.service';

@Component({
  standalone: true,
  templateUrl: './option-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OptionDeleteDialogComponent {
  option?: IOption;

  constructor(
    protected optionService: OptionService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.optionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
