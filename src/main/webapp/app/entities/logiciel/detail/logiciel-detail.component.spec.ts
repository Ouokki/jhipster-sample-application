import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LogicielDetailComponent } from './logiciel-detail.component';

describe('Logiciel Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicielDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: LogicielDetailComponent,
              resolve: { logiciel: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(LogicielDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load logiciel on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', LogicielDetailComponent);

      // THEN
      expect(instance.logiciel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
