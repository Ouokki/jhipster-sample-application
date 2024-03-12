jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TarifReferenceOptionService } from '../service/tarif-reference-option.service';

import { TarifReferenceOptionDeleteDialogComponent } from './tarif-reference-option-delete-dialog.component';

describe('TarifReferenceOption Management Delete Component', () => {
  let comp: TarifReferenceOptionDeleteDialogComponent;
  let fixture: ComponentFixture<TarifReferenceOptionDeleteDialogComponent>;
  let service: TarifReferenceOptionService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TarifReferenceOptionDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(TarifReferenceOptionDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TarifReferenceOptionDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TarifReferenceOptionService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
