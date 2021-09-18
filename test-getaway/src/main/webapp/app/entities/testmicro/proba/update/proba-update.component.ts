import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProba, Proba } from '../proba.model';
import { ProbaService } from '../service/proba.service';

@Component({
  selector: 'jhi-proba-update',
  templateUrl: './proba-update.component.html',
})
export class ProbaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    ime: [],
  });

  constructor(protected probaService: ProbaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proba }) => {
      this.updateForm(proba);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proba = this.createFromForm();
    if (proba.id !== undefined) {
      this.subscribeToSaveResponse(this.probaService.update(proba));
    } else {
      this.subscribeToSaveResponse(this.probaService.create(proba));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProba>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(proba: IProba): void {
    this.editForm.patchValue({
      id: proba.id,
      ime: proba.ime,
    });
  }

  protected createFromForm(): IProba {
    return {
      ...new Proba(),
      id: this.editForm.get(['id'])!.value,
      ime: this.editForm.get(['ime'])!.value,
    };
  }
}
