import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReferenceOptionProduitCommercesDetailComponent } from './reference-option-produit-commerces-detail.component';

describe('ReferenceOptionProduitCommerces Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceOptionProduitCommercesDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ReferenceOptionProduitCommercesDetailComponent,
              resolve: { referenceOptionProduitCommerces: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ReferenceOptionProduitCommercesDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load referenceOptionProduitCommerces on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ReferenceOptionProduitCommercesDetailComponent);

      // THEN
      expect(instance.referenceOptionProduitCommerces).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
