import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GarantieService } from '../service/garantie.service';

import { GarantieComponent } from './garantie.component';

describe('Garantie Management Component', () => {
  let comp: GarantieComponent;
  let fixture: ComponentFixture<GarantieComponent>;
  let service: GarantieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'garantie', component: GarantieComponent }]),
        HttpClientTestingModule,
        GarantieComponent,
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
      .overrideTemplate(GarantieComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GarantieComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GarantieService);

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
    expect(comp.garanties?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to garantieService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGarantieIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGarantieIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
