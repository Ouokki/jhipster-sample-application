import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOffreProduit } from '../offre-produit.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../offre-produit.test-samples';

import { OffreProduitService } from './offre-produit.service';

const requireRestSample: IOffreProduit = {
  ...sampleWithRequiredData,
};

describe('OffreProduit Service', () => {
  let service: OffreProduitService;
  let httpMock: HttpTestingController;
  let expectedResult: IOffreProduit | IOffreProduit[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OffreProduitService);
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

    it('should create a OffreProduit', () => {
      const offreProduit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(offreProduit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OffreProduit', () => {
      const offreProduit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(offreProduit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OffreProduit', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OffreProduit', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a OffreProduit', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOffreProduitToCollectionIfMissing', () => {
      it('should add a OffreProduit to an empty array', () => {
        const offreProduit: IOffreProduit = sampleWithRequiredData;
        expectedResult = service.addOffreProduitToCollectionIfMissing([], offreProduit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(offreProduit);
      });

      it('should not add a OffreProduit to an array that contains it', () => {
        const offreProduit: IOffreProduit = sampleWithRequiredData;
        const offreProduitCollection: IOffreProduit[] = [
          {
            ...offreProduit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOffreProduitToCollectionIfMissing(offreProduitCollection, offreProduit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OffreProduit to an array that doesn't contain it", () => {
        const offreProduit: IOffreProduit = sampleWithRequiredData;
        const offreProduitCollection: IOffreProduit[] = [sampleWithPartialData];
        expectedResult = service.addOffreProduitToCollectionIfMissing(offreProduitCollection, offreProduit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(offreProduit);
      });

      it('should add only unique OffreProduit to an array', () => {
        const offreProduitArray: IOffreProduit[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const offreProduitCollection: IOffreProduit[] = [sampleWithRequiredData];
        expectedResult = service.addOffreProduitToCollectionIfMissing(offreProduitCollection, ...offreProduitArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const offreProduit: IOffreProduit = sampleWithRequiredData;
        const offreProduit2: IOffreProduit = sampleWithPartialData;
        expectedResult = service.addOffreProduitToCollectionIfMissing([], offreProduit, offreProduit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(offreProduit);
        expect(expectedResult).toContain(offreProduit2);
      });

      it('should accept null and undefined values', () => {
        const offreProduit: IOffreProduit = sampleWithRequiredData;
        expectedResult = service.addOffreProduitToCollectionIfMissing([], null, offreProduit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(offreProduit);
      });

      it('should return initial array if no OffreProduit is added', () => {
        const offreProduitCollection: IOffreProduit[] = [sampleWithRequiredData];
        expectedResult = service.addOffreProduitToCollectionIfMissing(offreProduitCollection, undefined, null);
        expect(expectedResult).toEqual(offreProduitCollection);
      });
    });

    describe('compareOffreProduit', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOffreProduit(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOffreProduit(entity1, entity2);
        const compareResult2 = service.compareOffreProduit(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOffreProduit(entity1, entity2);
        const compareResult2 = service.compareOffreProduit(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOffreProduit(entity1, entity2);
        const compareResult2 = service.compareOffreProduit(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
