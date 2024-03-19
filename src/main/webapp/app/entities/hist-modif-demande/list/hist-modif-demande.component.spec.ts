import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HistModifDemandeService } from '../service/hist-modif-demande.service';

import { HistModifDemandeComponent } from './hist-modif-demande.component';

describe('HistModifDemande Management Component', () => {
  let comp: HistModifDemandeComponent;
  let fixture: ComponentFixture<HistModifDemandeComponent>;
  let service: HistModifDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'hist-modif-demande', component: HistModifDemandeComponent }]),
        HttpClientTestingModule,
        HistModifDemandeComponent,
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
      .overrideTemplate(HistModifDemandeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HistModifDemandeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HistModifDemandeService);

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
    expect(comp.histModifDemandes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to histModifDemandeService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getHistModifDemandeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getHistModifDemandeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
