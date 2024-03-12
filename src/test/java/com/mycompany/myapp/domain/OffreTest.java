package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OffreProduitTestSamples.*;
import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class OffreTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Offre.class);
        Offre offre1 = getOffreSample1();
        Offre offre2 = new Offre();
        assertThat(offre1).isNotEqualTo(offre2);

        offre2.setId(offre1.getId());
        assertThat(offre1).isEqualTo(offre2);

        offre2 = getOffreSample2();
        assertThat(offre1).isNotEqualTo(offre2);
    }

    @Test
    void offreProduitTest() throws Exception {
        Offre offre = getOffreRandomSampleGenerator();
        OffreProduit offreProduitBack = getOffreProduitRandomSampleGenerator();

        offre.addOffreProduit(offreProduitBack);
        assertThat(offre.getOffreProduits()).containsOnly(offreProduitBack);
        assertThat(offreProduitBack.getOffres()).containsOnly(offre);

        offre.removeOffreProduit(offreProduitBack);
        assertThat(offre.getOffreProduits()).doesNotContain(offreProduitBack);
        assertThat(offreProduitBack.getOffres()).doesNotContain(offre);

        offre.offreProduits(new HashSet<>(Set.of(offreProduitBack)));
        assertThat(offre.getOffreProduits()).containsOnly(offreProduitBack);
        assertThat(offreProduitBack.getOffres()).containsOnly(offre);

        offre.setOffreProduits(new HashSet<>());
        assertThat(offre.getOffreProduits()).doesNotContain(offreProduitBack);
        assertThat(offreProduitBack.getOffres()).doesNotContain(offre);
    }
}
