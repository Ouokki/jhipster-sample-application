import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TarifReferenceOptionService } from '../service/tarif-reference-option.service';

import { TarifReferenceOptionComponent } from './tarif-reference-option.component';

describe('TarifReferenceOption Management Component', () => {
  let comp: TarifReferenceOptionComponent;
  let fixture: ComponentFixture<TarifReferenceOptionComponent>;
  let service: TarifReferenceOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tarif-reference-option', component: TarifReferenceOptionComponent }]),
        HttpClientTestingModule,
        TarifReferenceOptionComponent,
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
      .overrideTemplate(TarifReferenceOptionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TarifReferenceOptionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TarifReferenceOptionService);

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
    expect(comp.tarifReferenceOptions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tarifReferenceOptionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTarifReferenceOptionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTarifReferenceOptionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
