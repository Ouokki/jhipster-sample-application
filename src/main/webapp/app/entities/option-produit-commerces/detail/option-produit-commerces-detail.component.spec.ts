import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OptionProduitCommercesDetailComponent } from './option-produit-commerces-detail.component';

describe('OptionProduitCommerces Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionProduitCommercesDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: OptionProduitCommercesDetailComponent,
              resolve: { optionProduitCommerces: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(OptionProduitCommercesDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load optionProduitCommerces on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', OptionProduitCommercesDetailComponent);

      // THEN
      expect(instance.optionProduitCommerces).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
