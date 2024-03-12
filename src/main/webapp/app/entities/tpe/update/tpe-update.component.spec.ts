import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TpeService } from '../service/tpe.service';
import { ITpe } from '../tpe.model';
import { TpeFormService } from './tpe-form.service';

import { TpeUpdateComponent } from './tpe-update.component';

describe('Tpe Management Update Component', () => {
  let comp: TpeUpdateComponent;
  let fixture: ComponentFixture<TpeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tpeFormService: TpeFormService;
  let tpeService: TpeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), TpeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TpeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TpeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tpeFormService = TestBed.inject(TpeFormService);
    tpeService = TestBed.inject(TpeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tpe: ITpe = { id: 456 };

      activatedRoute.data = of({ tpe });
      comp.ngOnInit();

      expect(comp.tpe).toEqual(tpe);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITpe>>();
      const tpe = { id: 123 };
      jest.spyOn(tpeFormService, 'getTpe').mockReturnValue(tpe);
      jest.spyOn(tpeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tpe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tpe }));
      saveSubject.complete();

      // THEN
      expect(tpeFormService.getTpe).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tpeService.update).toHaveBeenCalledWith(expect.objectContaining(tpe));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITpe>>();
      const tpe = { id: 123 };
      jest.spyOn(tpeFormService, 'getTpe').mockReturnValue({ id: null });
      jest.spyOn(tpeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tpe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tpe }));
      saveSubject.complete();

      // THEN
      expect(tpeFormService.getTpe).toHaveBeenCalled();
      expect(tpeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITpe>>();
      const tpe = { id: 123 };
      jest.spyOn(tpeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tpe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tpeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
