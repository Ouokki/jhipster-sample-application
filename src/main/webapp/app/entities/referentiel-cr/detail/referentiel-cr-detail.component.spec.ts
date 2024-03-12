import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReferentielCRDetailComponent } from './referentiel-cr-detail.component';

describe('ReferentielCR Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferentielCRDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ReferentielCRDetailComponent,
              resolve: { referentielCR: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ReferentielCRDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load referentielCR on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ReferentielCRDetailComponent);

      // THEN
      expect(instance.referentielCR).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
