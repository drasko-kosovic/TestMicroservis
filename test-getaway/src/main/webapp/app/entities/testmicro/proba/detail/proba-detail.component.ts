import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProba } from '../proba.model';

@Component({
  selector: 'jhi-proba-detail',
  templateUrl: './proba-detail.component.html',
})
export class ProbaDetailComponent implements OnInit {
  proba: IProba | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proba }) => {
      this.proba = proba;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
