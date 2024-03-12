import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FdoService } from '../service/fdo.service';
import { IFdo } from '../fdo.model';
import { FdoFormService } from './fdo-form.service';

import { FdoUpdateComponent } from './fdo-update.component';

describe('Fdo Management Update Component', () => {
  let comp: FdoUpdateComponent;
  let fixture: ComponentFixture<FdoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let fdoFormService: FdoFormService;
  let fdoService: FdoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), FdoUpdateComponent],
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
      .overrideTemplate(FdoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FdoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fdoFormService = TestBed.inject(FdoFormService);
    fdoService = TestBed.inject(FdoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const fdo: IFdo = { id: 456 };

      activatedRoute.data = of({ fdo });
      comp.ngOnInit();

      expect(comp.fdo).toEqual(fdo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFdo>>();
      const fdo = { id: 123 };
      jest.spyOn(fdoFormService, 'getFdo').mockReturnValue(fdo);
      jest.spyOn(fdoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fdo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fdo }));
      saveSubject.complete();

      // THEN
      expect(fdoFormService.getFdo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(fdoService.update).toHaveBeenCalledWith(expect.objectContaining(fdo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFdo>>();
      const fdo = { id: 123 };
      jest.spyOn(fdoFormService, 'getFdo').mockReturnValue({ id: null });
      jest.spyOn(fdoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fdo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: fdo }));
      saveSubject.complete();

      // THEN
      expect(fdoFormService.getFdo).toHaveBeenCalled();
      expect(fdoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFdo>>();
      const fdo = { id: 123 };
      jest.spyOn(fdoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ fdo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(fdoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
