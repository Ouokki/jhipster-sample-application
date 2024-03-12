import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReferentielCRService } from '../service/referentiel-cr.service';

import { ReferentielCRComponent } from './referentiel-cr.component';

describe('ReferentielCR Management Component', () => {
  let comp: ReferentielCRComponent;
  let fixture: ComponentFixture<ReferentielCRComponent>;
  let service: ReferentielCRService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'referentiel-cr', component: ReferentielCRComponent }]),
        HttpClientTestingModule,
        ReferentielCRComponent,
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
      .overrideTemplate(ReferentielCRComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReferentielCRComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ReferentielCRService);

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
    expect(comp.referentielCRS?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to referentielCRService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getReferentielCRIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getReferentielCRIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
