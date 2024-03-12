import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TarifDetailComponent } from './tarif-detail.component';

describe('Tarif Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TarifDetailComponent,
              resolve: { tarif: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TarifDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tarif on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TarifDetailComponent);

      // THEN
      expect(instance.tarif).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
