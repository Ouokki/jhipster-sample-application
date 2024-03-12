import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConformiteService } from '../service/conformite.service';

import { ConformiteComponent } from './conformite.component';

describe('Conformite Management Component', () => {
  let comp: ConformiteComponent;
  let fixture: ComponentFixture<ConformiteComponent>;
  let service: ConformiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'conformite', component: ConformiteComponent }]),
        HttpClientTestingModule,
        ConformiteComponent,
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
      .overrideTemplate(ConformiteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConformiteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConformiteService);

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
    expect(comp.conformites?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to conformiteService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConformiteIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConformiteIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
