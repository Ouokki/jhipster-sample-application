import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ParametrageDetailComponent } from './parametrage-detail.component';

describe('Parametrage Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrageDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ParametrageDetailComponent,
              resolve: { parametrage: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ParametrageDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load parametrage on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ParametrageDetailComponent);

      // THEN
      expect(instance.parametrage).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
