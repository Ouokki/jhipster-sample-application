import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CRService } from '../service/cr.service';
import { ICR } from '../cr.model';
import { CRFormService } from './cr-form.service';

import { CRUpdateComponent } from './cr-update.component';

describe('CR Management Update Component', () => {
  let comp: CRUpdateComponent;
  let fixture: ComponentFixture<CRUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cRFormService: CRFormService;
  let cRService: CRService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CRUpdateComponent],
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
      .overrideTemplate(CRUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CRUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cRFormService = TestBed.inject(CRFormService);
    cRService = TestBed.inject(CRService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cR: ICR = { id: 456 };

      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      expect(comp.cR).toEqual(cR);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICR>>();
      const cR = { id: 123 };
      jest.spyOn(cRFormService, 'getCR').mockReturnValue(cR);
      jest.spyOn(cRService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cR }));
      saveSubject.complete();

      // THEN
      expect(cRFormService.getCR).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cRService.update).toHaveBeenCalledWith(expect.objectContaining(cR));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICR>>();
      const cR = { id: 123 };
      jest.spyOn(cRFormService, 'getCR').mockReturnValue({ id: null });
      jest.spyOn(cRService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cR: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cR }));
      saveSubject.complete();

      // THEN
      expect(cRFormService.getCR).toHaveBeenCalled();
      expect(cRService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICR>>();
      const cR = { id: 123 };
      jest.spyOn(cRService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cR });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cRService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
