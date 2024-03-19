import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GarantieDetailComponent } from './garantie-detail.component';

describe('Garantie Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarantieDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: GarantieDetailComponent,
              resolve: { garantie: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(GarantieDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load garantie on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', GarantieDetailComponent);

      // THEN
      expect(instance.garantie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
