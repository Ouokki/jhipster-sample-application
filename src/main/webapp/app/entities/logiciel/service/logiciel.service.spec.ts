import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILogiciel } from '../logiciel.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../logiciel.test-samples';

import { LogicielService } from './logiciel.service';

const requireRestSample: ILogiciel = {
  ...sampleWithRequiredData,
};

describe('Logiciel Service', () => {
  let service: LogicielService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogiciel | ILogiciel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LogicielService);
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

    it('should create a Logiciel', () => {
      const logiciel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logiciel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Logiciel', () => {
      const logiciel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logiciel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Logiciel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Logiciel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Logiciel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogicielToCollectionIfMissing', () => {
      it('should add a Logiciel to an empty array', () => {
        const logiciel: ILogiciel = sampleWithRequiredData;
        expectedResult = service.addLogicielToCollectionIfMissing([], logiciel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logiciel);
      });

      it('should not add a Logiciel to an array that contains it', () => {
        const logiciel: ILogiciel = sampleWithRequiredData;
        const logicielCollection: ILogiciel[] = [
          {
            ...logiciel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogicielToCollectionIfMissing(logicielCollection, logiciel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Logiciel to an array that doesn't contain it", () => {
        const logiciel: ILogiciel = sampleWithRequiredData;
        const logicielCollection: ILogiciel[] = [sampleWithPartialData];
        expectedResult = service.addLogicielToCollectionIfMissing(logicielCollection, logiciel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logiciel);
      });

      it('should add only unique Logiciel to an array', () => {
        const logicielArray: ILogiciel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logicielCollection: ILogiciel[] = [sampleWithRequiredData];
        expectedResult = service.addLogicielToCollectionIfMissing(logicielCollection, ...logicielArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logiciel: ILogiciel = sampleWithRequiredData;
        const logiciel2: ILogiciel = sampleWithPartialData;
        expectedResult = service.addLogicielToCollectionIfMissing([], logiciel, logiciel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logiciel);
        expect(expectedResult).toContain(logiciel2);
      });

      it('should accept null and undefined values', () => {
        const logiciel: ILogiciel = sampleWithRequiredData;
        expectedResult = service.addLogicielToCollectionIfMissing([], null, logiciel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logiciel);
      });

      it('should return initial array if no Logiciel is added', () => {
        const logicielCollection: ILogiciel[] = [sampleWithRequiredData];
        expectedResult = service.addLogicielToCollectionIfMissing(logicielCollection, undefined, null);
        expect(expectedResult).toEqual(logicielCollection);
      });
    });

    describe('compareLogiciel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogiciel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogiciel(entity1, entity2);
        const compareResult2 = service.compareLogiciel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogiciel(entity1, entity2);
        const compareResult2 = service.compareLogiciel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogiciel(entity1, entity2);
        const compareResult2 = service.compareLogiciel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
