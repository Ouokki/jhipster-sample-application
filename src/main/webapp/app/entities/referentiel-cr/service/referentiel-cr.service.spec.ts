import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IReferentielCR } from '../referentiel-cr.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../referentiel-cr.test-samples';

import { ReferentielCRService } from './referentiel-cr.service';

const requireRestSample: IReferentielCR = {
  ...sampleWithRequiredData,
};

describe('ReferentielCR Service', () => {
  let service: ReferentielCRService;
  let httpMock: HttpTestingController;
  let expectedResult: IReferentielCR | IReferentielCR[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ReferentielCRService);
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

    it('should create a ReferentielCR', () => {
      const referentielCR = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(referentielCR).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ReferentielCR', () => {
      const referentielCR = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(referentielCR).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ReferentielCR', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ReferentielCR', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ReferentielCR', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addReferentielCRToCollectionIfMissing', () => {
      it('should add a ReferentielCR to an empty array', () => {
        const referentielCR: IReferentielCR = sampleWithRequiredData;
        expectedResult = service.addReferentielCRToCollectionIfMissing([], referentielCR);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(referentielCR);
      });

      it('should not add a ReferentielCR to an array that contains it', () => {
        const referentielCR: IReferentielCR = sampleWithRequiredData;
        const referentielCRCollection: IReferentielCR[] = [
          {
            ...referentielCR,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addReferentielCRToCollectionIfMissing(referentielCRCollection, referentielCR);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ReferentielCR to an array that doesn't contain it", () => {
        const referentielCR: IReferentielCR = sampleWithRequiredData;
        const referentielCRCollection: IReferentielCR[] = [sampleWithPartialData];
        expectedResult = service.addReferentielCRToCollectionIfMissing(referentielCRCollection, referentielCR);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(referentielCR);
      });

      it('should add only unique ReferentielCR to an array', () => {
        const referentielCRArray: IReferentielCR[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const referentielCRCollection: IReferentielCR[] = [sampleWithRequiredData];
        expectedResult = service.addReferentielCRToCollectionIfMissing(referentielCRCollection, ...referentielCRArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const referentielCR: IReferentielCR = sampleWithRequiredData;
        const referentielCR2: IReferentielCR = sampleWithPartialData;
        expectedResult = service.addReferentielCRToCollectionIfMissing([], referentielCR, referentielCR2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(referentielCR);
        expect(expectedResult).toContain(referentielCR2);
      });

      it('should accept null and undefined values', () => {
        const referentielCR: IReferentielCR = sampleWithRequiredData;
        expectedResult = service.addReferentielCRToCollectionIfMissing([], null, referentielCR, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(referentielCR);
      });

      it('should return initial array if no ReferentielCR is added', () => {
        const referentielCRCollection: IReferentielCR[] = [sampleWithRequiredData];
        expectedResult = service.addReferentielCRToCollectionIfMissing(referentielCRCollection, undefined, null);
        expect(expectedResult).toEqual(referentielCRCollection);
      });
    });

    describe('compareReferentielCR', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareReferentielCR(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareReferentielCR(entity1, entity2);
        const compareResult2 = service.compareReferentielCR(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareReferentielCR(entity1, entity2);
        const compareResult2 = service.compareReferentielCR(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareReferentielCR(entity1, entity2);
        const compareResult2 = service.compareReferentielCR(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
