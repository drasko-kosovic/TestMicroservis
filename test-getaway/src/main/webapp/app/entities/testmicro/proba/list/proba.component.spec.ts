import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProbaService } from '../service/proba.service';

import { ProbaComponent } from './proba.component';

describe('Component Tests', () => {
  describe('Proba Management Component', () => {
    let comp: ProbaComponent;
    let fixture: ComponentFixture<ProbaComponent>;
    let service: ProbaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProbaComponent],
      })
        .overrideTemplate(ProbaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProbaComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProbaService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.probas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
