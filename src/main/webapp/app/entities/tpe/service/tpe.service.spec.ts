import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITpe } from '../tpe.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tpe.test-samples';

import { TpeService } from './tpe.service';

const requireRestSample: ITpe = {
  ...sampleWithRequiredData,
};

describe('Tpe Service', () => {
  let service: TpeService;
  let httpMock: HttpTestingController;
  let expectedResult: ITpe | ITpe[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TpeService);
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

    it('should create a Tpe', () => {
      const tpe = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tpe).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Tpe', () => {
      const tpe = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tpe).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Tpe', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Tpe', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Tpe', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTpeToCollectionIfMissing', () => {
      it('should add a Tpe to an empty array', () => {
        const tpe: ITpe = sampleWithRequiredData;
        expectedResult = service.addTpeToCollectionIfMissing([], tpe);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tpe);
      });

      it('should not add a Tpe to an array that contains it', () => {
        const tpe: ITpe = sampleWithRequiredData;
        const tpeCollection: ITpe[] = [
          {
            ...tpe,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTpeToCollectionIfMissing(tpeCollection, tpe);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Tpe to an array that doesn't contain it", () => {
        const tpe: ITpe = sampleWithRequiredData;
        const tpeCollection: ITpe[] = [sampleWithPartialData];
        expectedResult = service.addTpeToCollectionIfMissing(tpeCollection, tpe);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tpe);
      });

      it('should add only unique Tpe to an array', () => {
        const tpeArray: ITpe[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tpeCollection: ITpe[] = [sampleWithRequiredData];
        expectedResult = service.addTpeToCollectionIfMissing(tpeCollection, ...tpeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tpe: ITpe = sampleWithRequiredData;
        const tpe2: ITpe = sampleWithPartialData;
        expectedResult = service.addTpeToCollectionIfMissing([], tpe, tpe2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tpe);
        expect(expectedResult).toContain(tpe2);
      });

      it('should accept null and undefined values', () => {
        const tpe: ITpe = sampleWithRequiredData;
        expectedResult = service.addTpeToCollectionIfMissing([], null, tpe, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tpe);
      });

      it('should return initial array if no Tpe is added', () => {
        const tpeCollection: ITpe[] = [sampleWithRequiredData];
        expectedResult = service.addTpeToCollectionIfMissing(tpeCollection, undefined, null);
        expect(expectedResult).toEqual(tpeCollection);
      });
    });

    describe('compareTpe', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTpe(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTpe(entity1, entity2);
        const compareResult2 = service.compareTpe(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTpe(entity1, entity2);
        const compareResult2 = service.compareTpe(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTpe(entity1, entity2);
        const compareResult2 = service.compareTpe(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
