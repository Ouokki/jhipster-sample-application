import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IFdo } from '../fdo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fdo.test-samples';

import { FdoService } from './fdo.service';

const requireRestSample: IFdo = {
  ...sampleWithRequiredData,
};

describe('Fdo Service', () => {
  let service: FdoService;
  let httpMock: HttpTestingController;
  let expectedResult: IFdo | IFdo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(FdoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Fdo', () => {
      const fdo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fdo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Fdo', () => {
      const fdo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fdo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Fdo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Fdo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Fdo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFdoToCollectionIfMissing', () => {
      it('should add a Fdo to an empty array', () => {
        const fdo: IFdo = sampleWithRequiredData;
        expectedResult = service.addFdoToCollectionIfMissing([], fdo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fdo);
      });

      it('should not add a Fdo to an array that contains it', () => {
        const fdo: IFdo = sampleWithRequiredData;
        const fdoCollection: IFdo[] = [
          {
            ...fdo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFdoToCollectionIfMissing(fdoCollection, fdo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Fdo to an array that doesn't contain it", () => {
        const fdo: IFdo = sampleWithRequiredData;
        const fdoCollection: IFdo[] = [sampleWithPartialData];
        expectedResult = service.addFdoToCollectionIfMissing(fdoCollection, fdo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fdo);
      });

      it('should add only unique Fdo to an array', () => {
        const fdoArray: IFdo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fdoCollection: IFdo[] = [sampleWithRequiredData];
        expectedResult = service.addFdoToCollectionIfMissing(fdoCollection, ...fdoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fdo: IFdo = sampleWithRequiredData;
        const fdo2: IFdo = sampleWithPartialData;
        expectedResult = service.addFdoToCollectionIfMissing([], fdo, fdo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fdo);
        expect(expectedResult).toContain(fdo2);
      });

      it('should accept null and undefined values', () => {
        const fdo: IFdo = sampleWithRequiredData;
        expectedResult = service.addFdoToCollectionIfMissing([], null, fdo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fdo);
      });

      it('should return initial array if no Fdo is added', () => {
        const fdoCollection: IFdo[] = [sampleWithRequiredData];
        expectedResult = service.addFdoToCollectionIfMissing(fdoCollection, undefined, null);
        expect(expectedResult).toEqual(fdoCollection);
      });
    });

    describe('compareFdo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFdo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFdo(entity1, entity2);
        const compareResult2 = service.compareFdo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFdo(entity1, entity2);
        const compareResult2 = service.compareFdo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFdo(entity1, entity2);
        const compareResult2 = service.compareFdo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
