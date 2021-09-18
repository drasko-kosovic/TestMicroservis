import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProba } from '../proba.model';
import { ProbaService } from '../service/proba.service';
import { ProbaDeleteDialogComponent } from '../delete/proba-delete-dialog.component';

@Component({
  selector: 'jhi-proba',
  templateUrl: './proba.component.html',
})
export class ProbaComponent implements OnInit {
  probas?: IProba[];
  isLoading = false;

  constructor(protected probaService: ProbaService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.probaService.query().subscribe(
      (res: HttpResponse<IProba[]>) => {
        this.isLoading = false;
        this.probas = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProba): number {
    return item.id!;
  }

  delete(proba: IProba): void {
    const modalRef = this.modalService.open(ProbaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proba = proba;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
