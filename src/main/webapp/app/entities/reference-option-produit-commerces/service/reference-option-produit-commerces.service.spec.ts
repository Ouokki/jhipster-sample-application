import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../reference-option-produit-commerces.test-samples';

import { ReferenceOptionProduitCommercesService } from './reference-option-produit-commerces.service';

const requireRestSample: IReferenceOptionProduitCommerces = {
  ...sampleWithRequiredData,
};

describe('ReferenceOptionProduitCommerces Service', () => {
  let service: ReferenceOptionProduitCommercesService;
  let httpMock: HttpTestingController;
  let expectedResult: IReferenceOptionProduitCommerces | IReferenceOptionProduitCommerces[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReferenceOptionProduitCommercesService);
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

    it('should create a ReferenceOptionProduitCommerces', () => {
      const referenceOptionProduitCommerces = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(referenceOptionProduitCommerces).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReferenceOptionProduitCommerces', () => {
      const referenceOptionProduitCommerces = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(referenceOptionProduitCommerces).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReferenceOptionProduitCommerces', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReferenceOptionProduitCommerces', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReferenceOptionProduitCommerces', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReferenceOptionProduitCommercesToCollectionIfMissing', () => {
      it('should add a ReferenceOptionProduitCommerces to an empty array', () => {
        const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = sampleWithRequiredData;
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing([], referenceOptionProduitCommerces);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(referenceOptionProduitCommerces);
      });

      it('should not add a ReferenceOptionProduitCommerces to an array that contains it', () => {
        const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = sampleWithRequiredData;
        const referenceOptionProduitCommercesCollection: IReferenceOptionProduitCommerces[] = [
          {
            ...referenceOptionProduitCommerces,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing(
          referenceOptionProduitCommercesCollection,
          referenceOptionProduitCommerces,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReferenceOptionProduitCommerces to an array that doesn't contain it", () => {
        const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = sampleWithRequiredData;
        const referenceOptionProduitCommercesCollection: IReferenceOptionProduitCommerces[] = [sampleWithPartialData];
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing(
          referenceOptionProduitCommercesCollection,
          referenceOptionProduitCommerces,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(referenceOptionProduitCommerces);
      });

      it('should add only unique ReferenceOptionProduitCommerces to an array', () => {
        const referenceOptionProduitCommercesArray: IReferenceOptionProduitCommerces[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const referenceOptionProduitCommercesCollection: IReferenceOptionProduitCommerces[] = [sampleWithRequiredData];
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing(
          referenceOptionProduitCommercesCollection,
          ...referenceOptionProduitCommercesArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = sampleWithRequiredData;
        const referenceOptionProduitCommerces2: IReferenceOptionProduitCommerces = sampleWithPartialData;
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing(
          [],
          referenceOptionProduitCommerces,
          referenceOptionProduitCommerces2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(referenceOptionProduitCommerces);
        expect(expectedResult).toContain(referenceOptionProduitCommerces2);
      });

      it('should accept null and undefined values', () => {
        const referenceOptionProduitCommerces: IReferenceOptionProduitCommerces = sampleWithRequiredData;
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing(
          [],
          null,
          referenceOptionProduitCommerces,
          undefined,
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(referenceOptionProduitCommerces);
      });

      it('should return initial array if no ReferenceOptionProduitCommerces is added', () => {
        const referenceOptionProduitCommercesCollection: IReferenceOptionProduitCommerces[] = [sampleWithRequiredData];
        expectedResult = service.addReferenceOptionProduitCommercesToCollectionIfMissing(
          referenceOptionProduitCommercesCollection,
          undefined,
          null,
        );
        expect(expectedResult).toEqual(referenceOptionProduitCommercesCollection);
      });
    });

    describe('compareReferenceOptionProduitCommerces', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReferenceOptionProduitCommerces(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReferenceOptionProduitCommerces(entity1, entity2);
        const compareResult2 = service.compareReferenceOptionProduitCommerces(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReferenceOptionProduitCommerces(entity1, entity2);
        const compareResult2 = service.compareReferenceOptionProduitCommerces(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReferenceOptionProduitCommerces(entity1, entity2);
        const compareResult2 = service.compareReferenceOptionProduitCommerces(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
