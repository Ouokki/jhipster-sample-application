import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AutreFraisService } from '../service/autre-frais.service';

import { AutreFraisComponent } from './autre-frais.component';

describe('AutreFrais Management Component', () => {
  let comp: AutreFraisComponent;
  let fixture: ComponentFixture<AutreFraisComponent>;
  let service: AutreFraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'autre-frais', component: AutreFraisComponent }]),
        HttpClientTestingModule,
        AutreFraisComponent,
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
      .overrideTemplate(AutreFraisComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AutreFraisComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AutreFraisService);

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
    expect(comp.autreFrais?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to autreFraisService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAutreFraisIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAutreFraisIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
