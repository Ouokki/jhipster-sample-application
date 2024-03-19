package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DemandeTestSamples.*;
import static com.mycompany.myapp.domain.HistModifDemandeTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class DemandeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Demande.class);
        Demande demande1 = getDemandeSample1();
        Demande demande2 = new Demande();
        assertThat(demande1).isNotEqualTo(demande2);

        demande2.setId(demande1.getId());
        assertThat(demande1).isEqualTo(demande2);

        demande2 = getDemandeSample2();
        assertThat(demande1).isNotEqualTo(demande2);
    }

    @Test
    void histModifDemandeTest() throws Exception {
        Demande demande = getDemandeRandomSampleGenerator();
        HistModifDemande histModifDemandeBack = getHistModifDemandeRandomSampleGenerator();

        demande.addHistModifDemande(histModifDemandeBack);
        assertThat(demande.getHistModifDemandes()).containsOnly(histModifDemandeBack);
        assertThat(histModifDemandeBack.getDemande()).isEqualTo(demande);

        demande.removeHistModifDemande(histModifDemandeBack);
        assertThat(demande.getHistModifDemandes()).doesNotContain(histModifDemandeBack);
        assertThat(histModifDemandeBack.getDemande()).isNull();

        demande.histModifDemandes(new HashSet<>(Set.of(histModifDemandeBack)));
        assertThat(demande.getHistModifDemandes()).containsOnly(histModifDemandeBack);
        assertThat(histModifDemandeBack.getDemande()).isEqualTo(demande);

        demande.setHistModifDemandes(new HashSet<>());
        assertThat(demande.getHistModifDemandes()).doesNotContain(histModifDemandeBack);
        assertThat(histModifDemandeBack.getDemande()).isNull();
    }

    @Test
    void parametrageTest() throws Exception {
        Demande demande = getDemandeRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        demande.setParametrage(parametrageBack);
        assertThat(demande.getParametrage()).isEqualTo(parametrageBack);
        assertThat(parametrageBack.getDemande()).isEqualTo(demande);

        demande.parametrage(null);
        assertThat(demande.getParametrage()).isNull();
        assertThat(parametrageBack.getDemande()).isNull();
    }
}
