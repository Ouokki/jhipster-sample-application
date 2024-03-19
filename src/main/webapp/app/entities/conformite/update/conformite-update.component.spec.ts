import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConformiteService } from '../service/conformite.service';
import { IConformite } from '../conformite.model';
import { ConformiteFormService } from './conformite-form.service';

import { ConformiteUpdateComponent } from './conformite-update.component';

describe('Conformite Management Update Component', () => {
  let comp: ConformiteUpdateComponent;
  let fixture: ComponentFixture<ConformiteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let conformiteFormService: ConformiteFormService;
  let conformiteService: ConformiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ConformiteUpdateComponent],
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
      .overrideTemplate(ConformiteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConformiteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    conformiteFormService = TestBed.inject(ConformiteFormService);
    conformiteService = TestBed.inject(ConformiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const conformite: IConformite = { id: 456 };

      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      expect(comp.conformite).toEqual(conformite);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConformite>>();
      const conformite = { id: 123 };
      jest.spyOn(conformiteFormService, 'getConformite').mockReturnValue(conformite);
      jest.spyOn(conformiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conformite }));
      saveSubject.complete();

      // THEN
      expect(conformiteFormService.getConformite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(conformiteService.update).toHaveBeenCalledWith(expect.objectContaining(conformite));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConformite>>();
      const conformite = { id: 123 };
      jest.spyOn(conformiteFormService, 'getConformite').mockReturnValue({ id: null });
      jest.spyOn(conformiteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conformite: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: conformite }));
      saveSubject.complete();

      // THEN
      expect(conformiteFormService.getConformite).toHaveBeenCalled();
      expect(conformiteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConformite>>();
      const conformite = { id: 123 };
      jest.spyOn(conformiteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ conformite });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(conformiteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
