import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProbaDetailComponent } from './proba-detail.component';

describe('Component Tests', () => {
  describe('Proba Management Detail Component', () => {
    let comp: ProbaDetailComponent;
    let fixture: ComponentFixture<ProbaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProbaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ proba: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProbaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProbaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proba on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proba).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
