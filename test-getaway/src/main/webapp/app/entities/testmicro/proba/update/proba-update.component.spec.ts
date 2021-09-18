jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProbaService } from '../service/proba.service';
import { IProba, Proba } from '../proba.model';

import { ProbaUpdateComponent } from './proba-update.component';

describe('Component Tests', () => {
  describe('Proba Management Update Component', () => {
    let comp: ProbaUpdateComponent;
    let fixture: ComponentFixture<ProbaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let probaService: ProbaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProbaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProbaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProbaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      probaService = TestBed.inject(ProbaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const proba: IProba = { id: 456 };

        activatedRoute.data = of({ proba });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(proba));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proba>>();
        const proba = { id: 123 };
        jest.spyOn(probaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proba });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: proba }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(probaService.update).toHaveBeenCalledWith(proba);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proba>>();
        const proba = new Proba();
        jest.spyOn(probaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proba });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: proba }));
        saveSubject.complete();

        // THEN
        expect(probaService.create).toHaveBeenCalledWith(proba);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Proba>>();
        const proba = { id: 123 };
        jest.spyOn(probaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ proba });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(probaService.update).toHaveBeenCalledWith(proba);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
