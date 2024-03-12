import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GarantieService } from '../service/garantie.service';
import { IGarantie } from '../garantie.model';
import { GarantieFormService } from './garantie-form.service';

import { GarantieUpdateComponent } from './garantie-update.component';

describe('Garantie Management Update Component', () => {
  let comp: GarantieUpdateComponent;
  let fixture: ComponentFixture<GarantieUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let garantieFormService: GarantieFormService;
  let garantieService: GarantieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), GarantieUpdateComponent],
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
      .overrideTemplate(GarantieUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GarantieUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    garantieFormService = TestBed.inject(GarantieFormService);
    garantieService = TestBed.inject(GarantieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const garantie: IGarantie = { id: 456 };

      activatedRoute.data = of({ garantie });
      comp.ngOnInit();

      expect(comp.garantie).toEqual(garantie);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGarantie>>();
      const garantie = { id: 123 };
      jest.spyOn(garantieFormService, 'getGarantie').mockReturnValue(garantie);
      jest.spyOn(garantieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ garantie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: garantie }));
      saveSubject.complete();

      // THEN
      expect(garantieFormService.getGarantie).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(garantieService.update).toHaveBeenCalledWith(expect.objectContaining(garantie));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGarantie>>();
      const garantie = { id: 123 };
      jest.spyOn(garantieFormService, 'getGarantie').mockReturnValue({ id: null });
      jest.spyOn(garantieService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ garantie: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: garantie }));
      saveSubject.complete();

      // THEN
      expect(garantieFormService.getGarantie).toHaveBeenCalled();
      expect(garantieService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGarantie>>();
      const garantie = { id: 123 };
      jest.spyOn(garantieService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ garantie });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(garantieService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
