import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProba } from '../proba.model';
import { ProbaService } from '../service/proba.service';

@Component({
  templateUrl: './proba-delete-dialog.component.html',
})
export class ProbaDeleteDialogComponent {
  proba?: IProba;

  constructor(protected probaService: ProbaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.probaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
