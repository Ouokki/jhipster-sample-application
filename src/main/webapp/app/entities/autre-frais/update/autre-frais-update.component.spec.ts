import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AutreFraisService } from '../service/autre-frais.service';
import { IAutreFrais } from '../autre-frais.model';
import { AutreFraisFormService } from './autre-frais-form.service';

import { AutreFraisUpdateComponent } from './autre-frais-update.component';

describe('AutreFrais Management Update Component', () => {
  let comp: AutreFraisUpdateComponent;
  let fixture: ComponentFixture<AutreFraisUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let autreFraisFormService: AutreFraisFormService;
  let autreFraisService: AutreFraisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), AutreFraisUpdateComponent],
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
      .overrideTemplate(AutreFraisUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AutreFraisUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    autreFraisFormService = TestBed.inject(AutreFraisFormService);
    autreFraisService = TestBed.inject(AutreFraisService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const autreFrais: IAutreFrais = { id: 456 };

      activatedRoute.data = of({ autreFrais });
      comp.ngOnInit();

      expect(comp.autreFrais).toEqual(autreFrais);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAutreFrais>>();
      const autreFrais = { id: 123 };
      jest.spyOn(autreFraisFormService, 'getAutreFrais').mockReturnValue(autreFrais);
      jest.spyOn(autreFraisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ autreFrais });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: autreFrais }));
      saveSubject.complete();

      // THEN
      expect(autreFraisFormService.getAutreFrais).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(autreFraisService.update).toHaveBeenCalledWith(expect.objectContaining(autreFrais));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAutreFrais>>();
      const autreFrais = { id: 123 };
      jest.spyOn(autreFraisFormService, 'getAutreFrais').mockReturnValue({ id: null });
      jest.spyOn(autreFraisService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ autreFrais: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: autreFrais }));
      saveSubject.complete();

      // THEN
      expect(autreFraisFormService.getAutreFrais).toHaveBeenCalled();
      expect(autreFraisService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAutreFrais>>();
      const autreFrais = { id: 123 };
      jest.spyOn(autreFraisService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ autreFrais });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(autreFraisService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
