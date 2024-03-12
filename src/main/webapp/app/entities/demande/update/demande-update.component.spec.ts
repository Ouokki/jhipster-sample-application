import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IHistModifDemande } from 'app/entities/hist-modif-demande/hist-modif-demande.model';
import { HistModifDemandeService } from 'app/entities/hist-modif-demande/service/hist-modif-demande.service';
import { DemandeService } from '../service/demande.service';
import { IDemande } from '../demande.model';
import { DemandeFormService } from './demande-form.service';

import { DemandeUpdateComponent } from './demande-update.component';

describe('Demande Management Update Component', () => {
  let comp: DemandeUpdateComponent;
  let fixture: ComponentFixture<DemandeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeFormService: DemandeFormService;
  let demandeService: DemandeService;
  let histModifDemandeService: HistModifDemandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DemandeUpdateComponent],
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
      .overrideTemplate(DemandeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeFormService = TestBed.inject(DemandeFormService);
    demandeService = TestBed.inject(DemandeService);
    histModifDemandeService = TestBed.inject(HistModifDemandeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call HistModifDemande query and add missing value', () => {
      const demande: IDemande = { id: 456 };
      const histModifDemande: IHistModifDemande = { id: 8358 };
      demande.histModifDemande = histModifDemande;

      const histModifDemandeCollection: IHistModifDemande[] = [{ id: 8344 }];
      jest.spyOn(histModifDemandeService, 'query').mockReturnValue(of(new HttpResponse({ body: histModifDemandeCollection })));
      const additionalHistModifDemandes = [histModifDemande];
      const expectedCollection: IHistModifDemande[] = [...additionalHistModifDemandes, ...histModifDemandeCollection];
      jest.spyOn(histModifDemandeService, 'addHistModifDemandeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(histModifDemandeService.query).toHaveBeenCalled();
      expect(histModifDemandeService.addHistModifDemandeToCollectionIfMissing).toHaveBeenCalledWith(
        histModifDemandeCollection,
        ...additionalHistModifDemandes.map(expect.objectContaining),
      );
      expect(comp.histModifDemandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const demande: IDemande = { id: 456 };
      const histModifDemande: IHistModifDemande = { id: 17750 };
      demande.histModifDemande = histModifDemande;

      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      expect(comp.histModifDemandesSharedCollection).toContain(histModifDemande);
      expect(comp.demande).toEqual(demande);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDemande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeFormService, 'getDemande').mockReturnValue(demande);
      jest.spyOn(demandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demande }));
      saveSubject.complete();

      // THEN
      expect(demandeFormService.getDemande).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeService.update).toHaveBeenCalledWith(expect.objectContaining(demande));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDemande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeFormService, 'getDemande').mockReturnValue({ id: null });
      jest.spyOn(demandeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demande }));
      saveSubject.complete();

      // THEN
      expect(demandeFormService.getDemande).toHaveBeenCalled();
      expect(demandeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDemande>>();
      const demande = { id: 123 };
      jest.spyOn(demandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareHistModifDemande', () => {
      it('Should forward to histModifDemandeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(histModifDemandeService, 'compareHistModifDemande');
        comp.compareHistModifDemande(entity, entity2);
        expect(histModifDemandeService.compareHistModifDemande).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
