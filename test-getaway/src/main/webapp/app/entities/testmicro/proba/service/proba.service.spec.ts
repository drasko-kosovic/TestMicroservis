import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProba, Proba } from '../proba.model';

import { ProbaService } from './proba.service';

describe('Service Tests', () => {
  describe('Proba Service', () => {
    let service: ProbaService;
    let httpMock: HttpTestingController;
    let elemDefault: IProba;
    let expectedResult: IProba | IProba[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProbaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        ime: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Proba', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Proba()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Proba', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            ime: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Proba', () => {
        const patchObject = Object.assign({}, new Proba());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Proba', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            ime: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Proba', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addProbaToCollectionIfMissing', () => {
        it('should add a Proba to an empty array', () => {
          const proba: IProba = { id: 123 };
          expectedResult = service.addProbaToCollectionIfMissing([], proba);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(proba);
        });

        it('should not add a Proba to an array that contains it', () => {
          const proba: IProba = { id: 123 };
          const probaCollection: IProba[] = [
            {
              ...proba,
            },
            { id: 456 },
          ];
          expectedResult = service.addProbaToCollectionIfMissing(probaCollection, proba);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Proba to an array that doesn't contain it", () => {
          const proba: IProba = { id: 123 };
          const probaCollection: IProba[] = [{ id: 456 }];
          expectedResult = service.addProbaToCollectionIfMissing(probaCollection, proba);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(proba);
        });

        it('should add only unique Proba to an array', () => {
          const probaArray: IProba[] = [{ id: 123 }, { id: 456 }, { id: 95261 }];
          const probaCollection: IProba[] = [{ id: 123 }];
          expectedResult = service.addProbaToCollectionIfMissing(probaCollection, ...probaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const proba: IProba = { id: 123 };
          const proba2: IProba = { id: 456 };
          expectedResult = service.addProbaToCollectionIfMissing([], proba, proba2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(proba);
          expect(expectedResult).toContain(proba2);
        });

        it('should accept null and undefined values', () => {
          const proba: IProba = { id: 123 };
          expectedResult = service.addProbaToCollectionIfMissing([], null, proba, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(proba);
        });

        it('should return initial array if no Proba is added', () => {
          const probaCollection: IProba[] = [{ id: 123 }];
          expectedResult = service.addProbaToCollectionIfMissing(probaCollection, undefined, null);
          expect(expectedResult).toEqual(probaCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
