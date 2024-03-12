import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FdoDetailComponent } from './fdo-detail.component';

describe('Fdo Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FdoDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: FdoDetailComponent,
              resolve: { fdo: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(FdoDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load fdo on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', FdoDetailComponent);

      // THEN
      expect(instance.fdo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
