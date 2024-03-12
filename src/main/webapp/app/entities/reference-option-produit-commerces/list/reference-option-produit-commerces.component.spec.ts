import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReferenceOptionProduitCommercesService } from '../service/reference-option-produit-commerces.service';

import { ReferenceOptionProduitCommercesComponent } from './reference-option-produit-commerces.component';

describe('ReferenceOptionProduitCommerces Management Component', () => {
  let comp: ReferenceOptionProduitCommercesComponent;
  let fixture: ComponentFixture<ReferenceOptionProduitCommercesComponent>;
  let service: ReferenceOptionProduitCommercesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'reference-option-produit-commerces', component: ReferenceOptionProduitCommercesComponent },
        ]),
        HttpClientTestingModule,
        ReferenceOptionProduitCommercesComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ReferenceOptionProduitCommercesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReferenceOptionProduitCommercesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ReferenceOptionProduitCommercesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.referenceOptionProduitCommerces?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to referenceOptionProduitCommercesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getReferenceOptionProduitCommercesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getReferenceOptionProduitCommercesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
