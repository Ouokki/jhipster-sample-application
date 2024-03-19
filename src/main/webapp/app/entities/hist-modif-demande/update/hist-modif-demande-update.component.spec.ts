import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IDemande } from 'app/entities/demande/demande.model';
import { DemandeService } from 'app/entities/demande/service/demande.service';
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
  let demandeService: DemandeService;

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
    demandeService = TestBed.inject(DemandeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Demande query and add missing value', () => {
      const histModifDemande: IHistModifDemande = { id: 456 };
      const demande: IDemande = { id: 28858 };
      histModifDemande.demande = demande;

      const demandeCollection: IDemande[] = [{ id: 27747 }];
      jest.spyOn(demandeService, 'query').mockReturnValue(of(new HttpResponse({ body: demandeCollection })));
      const additionalDemandes = [demande];
      const expectedCollection: IDemande[] = [...additionalDemandes, ...demandeCollection];
      jest.spyOn(demandeService, 'addDemandeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ histModifDemande });
      comp.ngOnInit();

      expect(demandeService.query).toHaveBeenCalled();
      expect(demandeService.addDemandeToCollectionIfMissing).toHaveBeenCalledWith(
        demandeCollection,
        ...additionalDemandes.map(expect.objectContaining),
      );
      expect(comp.demandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const histModifDemande: IHistModifDemande = { id: 456 };
      const demande: IDemande = { id: 6705 };
      histModifDemande.demande = demande;

      activatedRoute.data = of({ histModifDemande });
      comp.ngOnInit();

      expect(comp.demandesSharedCollection).toContain(demande);
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

  describe('Compare relationships', () => {
    describe('compareDemande', () => {
      it('Should forward to demandeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(demandeService, 'compareDemande');
        comp.compareDemande(entity, entity2);
        expect(demandeService.compareDemande).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
