import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OptionProduitCommercesService } from '../service/option-produit-commerces.service';

import { OptionProduitCommercesComponent } from './option-produit-commerces.component';

describe('OptionProduitCommerces Management Component', () => {
  let comp: OptionProduitCommercesComponent;
  let fixture: ComponentFixture<OptionProduitCommercesComponent>;
  let service: OptionProduitCommercesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'option-produit-commerces', component: OptionProduitCommercesComponent }]),
        HttpClientTestingModule,
        OptionProduitCommercesComponent,
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
      .overrideTemplate(OptionProduitCommercesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OptionProduitCommercesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OptionProduitCommercesService);

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
    expect(comp.optionProduitCommerces?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to optionProduitCommercesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOptionProduitCommercesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOptionProduitCommercesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
