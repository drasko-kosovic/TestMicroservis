jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IProba, Proba } from '../proba.model';
import { ProbaService } from '../service/proba.service';

import { ProbaRoutingResolveService } from './proba-routing-resolve.service';

describe('Service Tests', () => {
  describe('Proba routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ProbaRoutingResolveService;
    let service: ProbaService;
    let resultProba: IProba | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ProbaRoutingResolveService);
      service = TestBed.inject(ProbaService);
      resultProba = undefined;
    });

    describe('resolve', () => {
      it('should return IProba returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultProba = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultProba).toEqual({ id: 123 });
      });

      it('should return new IProba if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultProba = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultProba).toEqual(new Proba());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Proba })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultProba = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultProba).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
