import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TarifCommercantDetailComponent } from './tarif-commercant-detail.component';

describe('TarifCommercant Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifCommercantDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TarifCommercantDetailComponent,
              resolve: { tarifCommercant: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TarifCommercantDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tarifCommercant on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TarifCommercantDetailComponent);

      // THEN
      expect(instance.tarifCommercant).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
