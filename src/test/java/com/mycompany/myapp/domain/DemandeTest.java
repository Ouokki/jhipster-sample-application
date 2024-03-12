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

        demande.setHistModifDemande(histModifDemandeBack);
        assertThat(demande.getHistModifDemande()).isEqualTo(histModifDemandeBack);

        demande.histModifDemande(null);
        assertThat(demande.getHistModifDemande()).isNull();
    }

    @Test
    void parametrageTest() throws Exception {
        Demande demande = getDemandeRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        demande.addParametrage(parametrageBack);
        assertThat(demande.getParametrages()).containsOnly(parametrageBack);
        assertThat(parametrageBack.getDemande()).isEqualTo(demande);

        demande.removeParametrage(parametrageBack);
        assertThat(demande.getParametrages()).doesNotContain(parametrageBack);
        assertThat(parametrageBack.getDemande()).isNull();

        demande.parametrages(new HashSet<>(Set.of(parametrageBack)));
        assertThat(demande.getParametrages()).containsOnly(parametrageBack);
        assertThat(parametrageBack.getDemande()).isEqualTo(demande);

        demande.setParametrages(new HashSet<>());
        assertThat(demande.getParametrages()).doesNotContain(parametrageBack);
        assertThat(parametrageBack.getDemande()).isNull();
    }
}
