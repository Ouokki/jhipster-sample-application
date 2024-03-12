import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IParametrage } from '../parametrage.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../parametrage.test-samples';

import { ParametrageService } from './parametrage.service';

const requireRestSample: IParametrage = {
  ...sampleWithRequiredData,
};

describe('Parametrage Service', () => {
  let service: ParametrageService;
  let httpMock: HttpTestingController;
  let expectedResult: IParametrage | IParametrage[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ParametrageService);
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

    it('should create a Parametrage', () => {
      const parametrage = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(parametrage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Parametrage', () => {
      const parametrage = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(parametrage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Parametrage', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Parametrage', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Parametrage', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addParametrageToCollectionIfMissing', () => {
      it('should add a Parametrage to an empty array', () => {
        const parametrage: IParametrage = sampleWithRequiredData;
        expectedResult = service.addParametrageToCollectionIfMissing([], parametrage);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parametrage);
      });

      it('should not add a Parametrage to an array that contains it', () => {
        const parametrage: IParametrage = sampleWithRequiredData;
        const parametrageCollection: IParametrage[] = [
          {
            ...parametrage,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addParametrageToCollectionIfMissing(parametrageCollection, parametrage);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Parametrage to an array that doesn't contain it", () => {
        const parametrage: IParametrage = sampleWithRequiredData;
        const parametrageCollection: IParametrage[] = [sampleWithPartialData];
        expectedResult = service.addParametrageToCollectionIfMissing(parametrageCollection, parametrage);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parametrage);
      });

      it('should add only unique Parametrage to an array', () => {
        const parametrageArray: IParametrage[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const parametrageCollection: IParametrage[] = [sampleWithRequiredData];
        expectedResult = service.addParametrageToCollectionIfMissing(parametrageCollection, ...parametrageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const parametrage: IParametrage = sampleWithRequiredData;
        const parametrage2: IParametrage = sampleWithPartialData;
        expectedResult = service.addParametrageToCollectionIfMissing([], parametrage, parametrage2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parametrage);
        expect(expectedResult).toContain(parametrage2);
      });

      it('should accept null and undefined values', () => {
        const parametrage: IParametrage = sampleWithRequiredData;
        expectedResult = service.addParametrageToCollectionIfMissing([], null, parametrage, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(parametrage);
      });

      it('should return initial array if no Parametrage is added', () => {
        const parametrageCollection: IParametrage[] = [sampleWithRequiredData];
        expectedResult = service.addParametrageToCollectionIfMissing(parametrageCollection, undefined, null);
        expect(expectedResult).toEqual(parametrageCollection);
      });
    });

    describe('compareParametrage', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareParametrage(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareParametrage(entity1, entity2);
        const compareResult2 = service.compareParametrage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareParametrage(entity1, entity2);
        const compareResult2 = service.compareParametrage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareParametrage(entity1, entity2);
        const compareResult2 = service.compareParametrage(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
