import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICR } from 'app/entities/cr/cr.model';
import { CRService } from 'app/entities/cr/service/cr.service';
import { ReferentielCRService } from '../service/referentiel-cr.service';
import { IReferentielCR } from '../referentiel-cr.model';
import { ReferentielCRFormService } from './referentiel-cr-form.service';

import { ReferentielCRUpdateComponent } from './referentiel-cr-update.component';

describe('ReferentielCR Management Update Component', () => {
  let comp: ReferentielCRUpdateComponent;
  let fixture: ComponentFixture<ReferentielCRUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let referentielCRFormService: ReferentielCRFormService;
  let referentielCRService: ReferentielCRService;
  let cRService: CRService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ReferentielCRUpdateComponent],
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
      .overrideTemplate(ReferentielCRUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ReferentielCRUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    referentielCRFormService = TestBed.inject(ReferentielCRFormService);
    referentielCRService = TestBed.inject(ReferentielCRService);
    cRService = TestBed.inject(CRService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CR query and add missing value', () => {
      const referentielCR: IReferentielCR = { id: 456 };
      const cr: ICR = { id: 29199 };
      referentielCR.cr = cr;

      const cRCollection: ICR[] = [{ id: 751 }];
      jest.spyOn(cRService, 'query').mockReturnValue(of(new HttpResponse({ body: cRCollection })));
      const additionalCRS = [cr];
      const expectedCollection: ICR[] = [...additionalCRS, ...cRCollection];
      jest.spyOn(cRService, 'addCRToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ referentielCR });
      comp.ngOnInit();

      expect(cRService.query).toHaveBeenCalled();
      expect(cRService.addCRToCollectionIfMissing).toHaveBeenCalledWith(cRCollection, ...additionalCRS.map(expect.objectContaining));
      expect(comp.cRSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const referentielCR: IReferentielCR = { id: 456 };
      const cr: ICR = { id: 30382 };
      referentielCR.cr = cr;

      activatedRoute.data = of({ referentielCR });
      comp.ngOnInit();

      expect(comp.cRSSharedCollection).toContain(cr);
      expect(comp.referentielCR).toEqual(referentielCR);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReferentielCR>>();
      const referentielCR = { id: 123 };
      jest.spyOn(referentielCRFormService, 'getReferentielCR').mockReturnValue(referentielCR);
      jest.spyOn(referentielCRService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ referentielCR });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: referentielCR }));
      saveSubject.complete();

      // THEN
      expect(referentielCRFormService.getReferentielCR).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(referentielCRService.update).toHaveBeenCalledWith(expect.objectContaining(referentielCR));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReferentielCR>>();
      const referentielCR = { id: 123 };
      jest.spyOn(referentielCRFormService, 'getReferentielCR').mockReturnValue({ id: null });
      jest.spyOn(referentielCRService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ referentielCR: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: referentielCR }));
      saveSubject.complete();

      // THEN
      expect(referentielCRFormService.getReferentielCR).toHaveBeenCalled();
      expect(referentielCRService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IReferentielCR>>();
      const referentielCR = { id: 123 };
      jest.spyOn(referentielCRService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ referentielCR });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(referentielCRService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCR', () => {
      it('Should forward to cRService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(cRService, 'compareCR');
        comp.compareCR(entity, entity2);
        expect(cRService.compareCR).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
