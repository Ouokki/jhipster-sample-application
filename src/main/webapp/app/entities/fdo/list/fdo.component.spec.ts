import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FdoService } from '../service/fdo.service';

import { FdoComponent } from './fdo.component';

describe('Fdo Management Component', () => {
  let comp: FdoComponent;
  let fixture: ComponentFixture<FdoComponent>;
  let service: FdoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'fdo', component: FdoComponent }]), HttpClientTestingModule, FdoComponent],
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
      .overrideTemplate(FdoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FdoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FdoService);

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
    expect(comp.fdos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to fdoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFdoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFdoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
