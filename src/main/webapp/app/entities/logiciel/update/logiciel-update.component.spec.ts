import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LogicielService } from '../service/logiciel.service';
import { ILogiciel } from '../logiciel.model';
import { LogicielFormService } from './logiciel-form.service';

import { LogicielUpdateComponent } from './logiciel-update.component';

describe('Logiciel Management Update Component', () => {
  let comp: LogicielUpdateComponent;
  let fixture: ComponentFixture<LogicielUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let logicielFormService: LogicielFormService;
  let logicielService: LogicielService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), LogicielUpdateComponent],
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
      .overrideTemplate(LogicielUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LogicielUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    logicielFormService = TestBed.inject(LogicielFormService);
    logicielService = TestBed.inject(LogicielService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const logiciel: ILogiciel = { id: 456 };

      activatedRoute.data = of({ logiciel });
      comp.ngOnInit();

      expect(comp.logiciel).toEqual(logiciel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogiciel>>();
      const logiciel = { id: 123 };
      jest.spyOn(logicielFormService, 'getLogiciel').mockReturnValue(logiciel);
      jest.spyOn(logicielService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logiciel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logiciel }));
      saveSubject.complete();

      // THEN
      expect(logicielFormService.getLogiciel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(logicielService.update).toHaveBeenCalledWith(expect.objectContaining(logiciel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogiciel>>();
      const logiciel = { id: 123 };
      jest.spyOn(logicielFormService, 'getLogiciel').mockReturnValue({ id: null });
      jest.spyOn(logicielService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logiciel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: logiciel }));
      saveSubject.complete();

      // THEN
      expect(logicielFormService.getLogiciel).toHaveBeenCalled();
      expect(logicielService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILogiciel>>();
      const logiciel = { id: 123 };
      jest.spyOn(logicielService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ logiciel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(logicielService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
