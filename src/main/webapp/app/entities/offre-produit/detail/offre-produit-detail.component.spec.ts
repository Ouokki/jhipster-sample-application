import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OffreProduitDetailComponent } from './offre-produit-detail.component';

describe('OffreProduit Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreProduitDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OffreProduitDetailComponent,
              resolve: { offreProduit: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OffreProduitDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load offreProduit on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OffreProduitDetailComponent);

      // THEN
      expect(instance.offreProduit).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
