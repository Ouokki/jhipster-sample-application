import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TpeDetailComponent } from './tpe-detail.component';

describe('Tpe Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpeDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TpeDetailComponent,
              resolve: { tpe: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TpeDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load tpe on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TpeDetailComponent);

      // THEN
      expect(instance.tpe).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
