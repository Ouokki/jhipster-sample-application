import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OffreProduitService } from '../service/offre-produit.service';

import { OffreProduitComponent } from './offre-produit.component';

describe('OffreProduit Management Component', () => {
  let comp: OffreProduitComponent;
  let fixture: ComponentFixture<OffreProduitComponent>;
  let service: OffreProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'offre-produit', component: OffreProduitComponent }]),
        HttpClientTestingModule,
        OffreProduitComponent,
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
      .overrideTemplate(OffreProduitComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OffreProduitComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OffreProduitService);

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
    expect(comp.offreProduits?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to offreProduitService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOffreProduitIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOffreProduitIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
