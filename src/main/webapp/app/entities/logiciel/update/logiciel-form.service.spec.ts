import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../logiciel.test-samples';

import { LogicielFormService } from './logiciel-form.service';

describe('Logiciel Form Service', () => {
  let service: LogicielFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicielFormService);
  });

  describe('Service methods', () => {
    describe('createLogicielFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogicielFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            parDefault: expect.any(Object),
          }),
        );
      });

      it('passing ILogiciel should create a new form with FormGroup', () => {
        const formGroup = service.createLogicielFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            parDefault: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogiciel', () => {
      it('should return NewLogiciel for default Logiciel initial value', () => {
        const formGroup = service.createLogicielFormGroup(sampleWithNewData);

        const logiciel = service.getLogiciel(formGroup) as any;

        expect(logiciel).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogiciel for empty Logiciel initial value', () => {
        const formGroup = service.createLogicielFormGroup();

        const logiciel = service.getLogiciel(formGroup) as any;

        expect(logiciel).toMatchObject({});
      });

      it('should return ILogiciel', () => {
        const formGroup = service.createLogicielFormGroup(sampleWithRequiredData);

        const logiciel = service.getLogiciel(formGroup) as any;

        expect(logiciel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogiciel should not enable id FormControl', () => {
        const formGroup = service.createLogicielFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogiciel should disable id FormControl', () => {
        const formGroup = service.createLogicielFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
