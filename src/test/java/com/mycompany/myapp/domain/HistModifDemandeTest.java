package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DemandeTestSamples.*;
import static com.mycompany.myapp.domain.HistModifDemandeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HistModifDemandeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistModifDemande.class);
        HistModifDemande histModifDemande1 = getHistModifDemandeSample1();
        HistModifDemande histModifDemande2 = new HistModifDemande();
        assertThat(histModifDemande1).isNotEqualTo(histModifDemande2);

        histModifDemande2.setId(histModifDemande1.getId());
        assertThat(histModifDemande1).isEqualTo(histModifDemande2);

        histModifDemande2 = getHistModifDemandeSample2();
        assertThat(histModifDemande1).isNotEqualTo(histModifDemande2);
    }

    @Test
    void demandeTest() throws Exception {
        HistModifDemande histModifDemande = getHistModifDemandeRandomSampleGenerator();
        Demande demandeBack = getDemandeRandomSampleGenerator();

        histModifDemande.setDemande(demandeBack);
        assertThat(histModifDemande.getDemande()).isEqualTo(demandeBack);

        histModifDemande.demande(null);
        assertThat(histModifDemande.getDemande()).isNull();
    }
}
