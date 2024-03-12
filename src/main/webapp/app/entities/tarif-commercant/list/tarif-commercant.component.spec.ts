import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TarifCommercantService } from '../service/tarif-commercant.service';

import { TarifCommercantComponent } from './tarif-commercant.component';

describe('TarifCommercant Management Component', () => {
  let comp: TarifCommercantComponent;
  let fixture: ComponentFixture<TarifCommercantComponent>;
  let service: TarifCommercantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tarif-commercant', component: TarifCommercantComponent }]),
        HttpClientTestingModule,
        TarifCommercantComponent,
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
      .overrideTemplate(TarifCommercantComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifCommercantComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TarifCommercantService);

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
    expect(comp.tarifCommercants?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tarifCommercantService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTarifCommercantIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTarifCommercantIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
