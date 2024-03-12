import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesService } from '../service/reference-option-produit-commerces.service';

@Component({
  standalone: true,
  templateUrl: './reference-option-produit-commerces-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ReferenceOptionProduitCommercesDeleteDialogComponent {
  referenceOptionProduitCommerces?: IReferenceOptionProduitCommerces;

  constructor(
    protected referenceOptionProduitCommercesService: ReferenceOptionProduitCommercesService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.referenceOptionProduitCommercesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
