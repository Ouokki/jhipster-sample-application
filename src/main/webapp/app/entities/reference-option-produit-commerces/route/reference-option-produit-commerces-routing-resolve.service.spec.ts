import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IReferenceOptionProduitCommerces } from '../reference-option-produit-commerces.model';
import { ReferenceOptionProduitCommercesService } from '../service/reference-option-produit-commerces.service';

import referenceOptionProduitCommercesResolve from './reference-option-produit-commerces-routing-resolve.service';

describe('ReferenceOptionProduitCommerces routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: ReferenceOptionProduitCommercesService;
  let resultReferenceOptionProduitCommerces: IReferenceOptionProduitCommerces | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(ReferenceOptionProduitCommercesService);
    resultReferenceOptionProduitCommerces = undefined;
  });

  describe('resolve', () => {
    it('should return IReferenceOptionProduitCommerces returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        referenceOptionProduitCommercesResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultReferenceOptionProduitCommerces = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultReferenceOptionProduitCommerces).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        referenceOptionProduitCommercesResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultReferenceOptionProduitCommerces = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultReferenceOptionProduitCommerces).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IReferenceOptionProduitCommerces>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        referenceOptionProduitCommercesResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultReferenceOptionProduitCommerces = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultReferenceOptionProduitCommerces).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
