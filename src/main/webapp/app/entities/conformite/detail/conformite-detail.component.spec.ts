import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConformiteDetailComponent } from './conformite-detail.component';

describe('Conformite Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConformiteDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: ConformiteDetailComponent,
              resolve: { conformite: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(ConformiteDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load conformite on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', ConformiteDetailComponent);

      // THEN
      expect(instance.conformite).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
