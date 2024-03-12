import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AutreFraisDetailComponent } from './autre-frais-detail.component';

describe('AutreFrais Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutreFraisDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AutreFraisDetailComponent,
              resolve: { autreFrais: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AutreFraisDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load autreFrais on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AutreFraisDetailComponent);

      // THEN
      expect(instance.autreFrais).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
