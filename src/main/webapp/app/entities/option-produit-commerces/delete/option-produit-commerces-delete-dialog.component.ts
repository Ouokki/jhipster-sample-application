import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IOptionProduitCommerces } from '../option-produit-commerces.model';
import { OptionProduitCommercesService } from '../service/option-produit-commerces.service';

@Component({
  standalone: true,
  templateUrl: './option-produit-commerces-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class OptionProduitCommercesDeleteDialogComponent {
  optionProduitCommerces?: IOptionProduitCommerces;

  constructor(
    protected optionProduitCommercesService: OptionProduitCommercesService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.optionProduitCommercesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
