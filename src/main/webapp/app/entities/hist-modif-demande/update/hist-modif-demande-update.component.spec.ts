import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HistModifDemandeService } from '../service/hist-modif-demande.service';
import { IHistModifDemande } from '../hist-modif-demande.model';
import { HistModifDemandeFormService } from './hist-modif-demande-form.service';

import { HistModifDemandeUpdateComponent } from './hist-modif-demande-update.component';

describe('HistModifDemande Management Update Component', () => {
  let comp: HistModifDemandeUpdateComponent;
  let fixture: ComponentFixture<HistModifDemandeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let histModifDemandeFormService: HistModifDemandeFormService;
  let histModifDemandeService: HistModifDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), HistModifDemandeUpdateComponent],
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
      .overrideTemplate(HistModifDemandeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HistModifDemandeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    histModifDemandeFormService = TestBed.inject(HistModifDemandeFormService);
    histModifDemandeService = TestBed.inject(HistModifDemandeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const histModifDemande: IHistModifDemande = { id: 456 };

      activatedRoute.data = of({ histModifDemande });
      comp.ngOnInit();

      expect(comp.histModifDemande).toEqual(histModifDemande);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHistModifDemande>>();
      const histModifDemande = { id: 123 };
      jest.spyOn(histModifDemandeFormService, 'getHistModifDemande').mockReturnValue(histModifDemande);
      jest.spyOn(histModifDemandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ histModifDemande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: histModifDemande }));
      saveSubject.complete();

      // THEN
      expect(histModifDemandeFormService.getHistModifDemande).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(histModifDemandeService.update).toHaveBeenCalledWith(expect.objectContaining(histModifDemande));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHistModifDemande>>();
      const histModifDemande = { id: 123 };
      jest.spyOn(histModifDemandeFormService, 'getHistModifDemande').mockReturnValue({ id: null });
      jest.spyOn(histModifDemandeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ histModifDemande: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: histModifDemande }));
      saveSubject.complete();

      // THEN
      expect(histModifDemandeFormService.getHistModifDemande).toHaveBeenCalled();
      expect(histModifDemandeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHistModifDemande>>();
      const histModifDemande = { id: 123 };
      jest.spyOn(histModifDemandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ histModifDemande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(histModifDemandeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
