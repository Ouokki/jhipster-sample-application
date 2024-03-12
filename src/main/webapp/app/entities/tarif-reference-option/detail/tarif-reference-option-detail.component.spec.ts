import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TarifReferenceOptionDetailComponent } from './tarif-reference-option-detail.component';

describe('TarifReferenceOption Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifReferenceOptionDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TarifReferenceOptionDetailComponent,
              resolve: { tarifReferenceOption: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TarifReferenceOptionDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tarifReferenceOption on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TarifReferenceOptionDetailComponent);

      // THEN
      expect(instance.tarifReferenceOption).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
