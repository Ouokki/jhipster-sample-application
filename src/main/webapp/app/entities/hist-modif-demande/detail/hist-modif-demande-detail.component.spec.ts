import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HistModifDemandeDetailComponent } from './hist-modif-demande-detail.component';

describe('HistModifDemande Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistModifDemandeDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HistModifDemandeDetailComponent,
              resolve: { histModifDemande: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HistModifDemandeDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load histModifDemande on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HistModifDemandeDetailComponent);

      // THEN
      expect(instance.histModifDemande).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
