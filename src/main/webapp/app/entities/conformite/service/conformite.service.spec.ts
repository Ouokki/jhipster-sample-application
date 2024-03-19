import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConformite } from '../conformite.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../conformite.test-samples';

import { ConformiteService } from './conformite.service';

const requireRestSample: IConformite = {
  ...sampleWithRequiredData,
};

describe('Conformite Service', () => {
  let service: ConformiteService;
  let httpMock: HttpTestingController;
  let expectedResult: IConformite | IConformite[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConformiteService);
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

    it('should create a Conformite', () => {
      const conformite = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(conformite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Conformite', () => {
      const conformite = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(conformite).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Conformite', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Conformite', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Conformite', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConformiteToCollectionIfMissing', () => {
      it('should add a Conformite to an empty array', () => {
        const conformite: IConformite = sampleWithRequiredData;
        expectedResult = service.addConformiteToCollectionIfMissing([], conformite);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conformite);
      });

      it('should not add a Conformite to an array that contains it', () => {
        const conformite: IConformite = sampleWithRequiredData;
        const conformiteCollection: IConformite[] = [
          {
            ...conformite,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConformiteToCollectionIfMissing(conformiteCollection, conformite);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Conformite to an array that doesn't contain it", () => {
        const conformite: IConformite = sampleWithRequiredData;
        const conformiteCollection: IConformite[] = [sampleWithPartialData];
        expectedResult = service.addConformiteToCollectionIfMissing(conformiteCollection, conformite);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conformite);
      });

      it('should add only unique Conformite to an array', () => {
        const conformiteArray: IConformite[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const conformiteCollection: IConformite[] = [sampleWithRequiredData];
        expectedResult = service.addConformiteToCollectionIfMissing(conformiteCollection, ...conformiteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const conformite: IConformite = sampleWithRequiredData;
        const conformite2: IConformite = sampleWithPartialData;
        expectedResult = service.addConformiteToCollectionIfMissing([], conformite, conformite2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(conformite);
        expect(expectedResult).toContain(conformite2);
      });

      it('should accept null and undefined values', () => {
        const conformite: IConformite = sampleWithRequiredData;
        expectedResult = service.addConformiteToCollectionIfMissing([], null, conformite, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(conformite);
      });

      it('should return initial array if no Conformite is added', () => {
        const conformiteCollection: IConformite[] = [sampleWithRequiredData];
        expectedResult = service.addConformiteToCollectionIfMissing(conformiteCollection, undefined, null);
        expect(expectedResult).toEqual(conformiteCollection);
      });
    });

    describe('compareConformite', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConformite(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConformite(entity1, entity2);
        const compareResult2 = service.compareConformite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConformite(entity1, entity2);
        const compareResult2 = service.compareConformite(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConformite(entity1, entity2);
        const compareResult2 = service.compareConformite(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
