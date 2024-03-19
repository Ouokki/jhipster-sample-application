import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CRDetailComponent } from './cr-detail.component';

describe('CR Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CRDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CRDetailComponent,
              resolve: { cR: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CRDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load cR on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CRDetailComponent);

      // THEN
      expect(instance.cR).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
