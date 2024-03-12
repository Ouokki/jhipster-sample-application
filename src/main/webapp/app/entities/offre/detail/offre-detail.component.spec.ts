import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OffreDetailComponent } from './offre-detail.component';

describe('Offre Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OffreDetailComponent,
              resolve: { offre: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OffreDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load offre on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OffreDetailComponent);

      // THEN
      expect(instance.offre).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
