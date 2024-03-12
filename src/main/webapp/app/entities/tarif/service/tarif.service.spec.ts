import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITarif } from '../tarif.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tarif.test-samples';

import { TarifService } from './tarif.service';

const requireRestSample: ITarif = {
  ...sampleWithRequiredData,
};

describe('Tarif Service', () => {
  let service: TarifService;
  let httpMock: HttpTestingController;
  let expectedResult: ITarif | ITarif[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TarifService);
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

    it('should create a Tarif', () => {
      const tarif = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tarif).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Tarif', () => {
      const tarif = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tarif).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Tarif', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Tarif', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Tarif', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTarifToCollectionIfMissing', () => {
      it('should add a Tarif to an empty array', () => {
        const tarif: ITarif = sampleWithRequiredData;
        expectedResult = service.addTarifToCollectionIfMissing([], tarif);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tarif);
      });

      it('should not add a Tarif to an array that contains it', () => {
        const tarif: ITarif = sampleWithRequiredData;
        const tarifCollection: ITarif[] = [
          {
            ...tarif,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTarifToCollectionIfMissing(tarifCollection, tarif);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Tarif to an array that doesn't contain it", () => {
        const tarif: ITarif = sampleWithRequiredData;
        const tarifCollection: ITarif[] = [sampleWithPartialData];
        expectedResult = service.addTarifToCollectionIfMissing(tarifCollection, tarif);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tarif);
      });

      it('should add only unique Tarif to an array', () => {
        const tarifArray: ITarif[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tarifCollection: ITarif[] = [sampleWithRequiredData];
        expectedResult = service.addTarifToCollectionIfMissing(tarifCollection, ...tarifArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tarif: ITarif = sampleWithRequiredData;
        const tarif2: ITarif = sampleWithPartialData;
        expectedResult = service.addTarifToCollectionIfMissing([], tarif, tarif2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tarif);
        expect(expectedResult).toContain(tarif2);
      });

      it('should accept null and undefined values', () => {
        const tarif: ITarif = sampleWithRequiredData;
        expectedResult = service.addTarifToCollectionIfMissing([], null, tarif, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tarif);
      });

      it('should return initial array if no Tarif is added', () => {
        const tarifCollection: ITarif[] = [sampleWithRequiredData];
        expectedResult = service.addTarifToCollectionIfMissing(tarifCollection, undefined, null);
        expect(expectedResult).toEqual(tarifCollection);
      });
    });

    describe('compareTarif', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTarif(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTarif(entity1, entity2);
        const compareResult2 = service.compareTarif(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTarif(entity1, entity2);
        const compareResult2 = service.compareTarif(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTarif(entity1, entity2);
        const compareResult2 = service.compareTarif(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
