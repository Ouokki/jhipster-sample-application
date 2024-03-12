import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAutreFrais } from '../autre-frais.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../autre-frais.test-samples';

import { AutreFraisService } from './autre-frais.service';

const requireRestSample: IAutreFrais = {
  ...sampleWithRequiredData,
};

describe('AutreFrais Service', () => {
  let service: AutreFraisService;
  let httpMock: HttpTestingController;
  let expectedResult: IAutreFrais | IAutreFrais[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AutreFraisService);
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

    it('should create a AutreFrais', () => {
      const autreFrais = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(autreFrais).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AutreFrais', () => {
      const autreFrais = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(autreFrais).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AutreFrais', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AutreFrais', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AutreFrais', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAutreFraisToCollectionIfMissing', () => {
      it('should add a AutreFrais to an empty array', () => {
        const autreFrais: IAutreFrais = sampleWithRequiredData;
        expectedResult = service.addAutreFraisToCollectionIfMissing([], autreFrais);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(autreFrais);
      });

      it('should not add a AutreFrais to an array that contains it', () => {
        const autreFrais: IAutreFrais = sampleWithRequiredData;
        const autreFraisCollection: IAutreFrais[] = [
          {
            ...autreFrais,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAutreFraisToCollectionIfMissing(autreFraisCollection, autreFrais);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AutreFrais to an array that doesn't contain it", () => {
        const autreFrais: IAutreFrais = sampleWithRequiredData;
        const autreFraisCollection: IAutreFrais[] = [sampleWithPartialData];
        expectedResult = service.addAutreFraisToCollectionIfMissing(autreFraisCollection, autreFrais);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(autreFrais);
      });

      it('should add only unique AutreFrais to an array', () => {
        const autreFraisArray: IAutreFrais[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const autreFraisCollection: IAutreFrais[] = [sampleWithRequiredData];
        expectedResult = service.addAutreFraisToCollectionIfMissing(autreFraisCollection, ...autreFraisArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const autreFrais: IAutreFrais = sampleWithRequiredData;
        const autreFrais2: IAutreFrais = sampleWithPartialData;
        expectedResult = service.addAutreFraisToCollectionIfMissing([], autreFrais, autreFrais2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(autreFrais);
        expect(expectedResult).toContain(autreFrais2);
      });

      it('should accept null and undefined values', () => {
        const autreFrais: IAutreFrais = sampleWithRequiredData;
        expectedResult = service.addAutreFraisToCollectionIfMissing([], null, autreFrais, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(autreFrais);
      });

      it('should return initial array if no AutreFrais is added', () => {
        const autreFraisCollection: IAutreFrais[] = [sampleWithRequiredData];
        expectedResult = service.addAutreFraisToCollectionIfMissing(autreFraisCollection, undefined, null);
        expect(expectedResult).toEqual(autreFraisCollection);
      });
    });

    describe('compareAutreFrais', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAutreFrais(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAutreFrais(entity1, entity2);
        const compareResult2 = service.compareAutreFrais(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAutreFrais(entity1, entity2);
        const compareResult2 = service.compareAutreFrais(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAutreFrais(entity1, entity2);
        const compareResult2 = service.compareAutreFrais(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
