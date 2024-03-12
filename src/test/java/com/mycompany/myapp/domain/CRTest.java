package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CRTestSamples.*;
import static com.mycompany.myapp.domain.OffreProduitTestSamples.*;
import static com.mycompany.myapp.domain.ReferentielCRTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CRTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CR.class);
        CR cR1 = getCRSample1();
        CR cR2 = new CR();
        assertThat(cR1).isNotEqualTo(cR2);

        cR2.setId(cR1.getId());
        assertThat(cR1).isEqualTo(cR2);

        cR2 = getCRSample2();
        assertThat(cR1).isNotEqualTo(cR2);
    }

    @Test
    void referentielCRTest() throws Exception {
        CR cR = getCRRandomSampleGenerator();
        ReferentielCR referentielCRBack = getReferentielCRRandomSampleGenerator();

        cR.addReferentielCR(referentielCRBack);
        assertThat(cR.getReferentielCRS()).containsOnly(referentielCRBack);
        assertThat(referentielCRBack.getCr()).isEqualTo(cR);

        cR.removeReferentielCR(referentielCRBack);
        assertThat(cR.getReferentielCRS()).doesNotContain(referentielCRBack);
        assertThat(referentielCRBack.getCr()).isNull();

        cR.referentielCRS(new HashSet<>(Set.of(referentielCRBack)));
        assertThat(cR.getReferentielCRS()).containsOnly(referentielCRBack);
        assertThat(referentielCRBack.getCr()).isEqualTo(cR);

        cR.setReferentielCRS(new HashSet<>());
        assertThat(cR.getReferentielCRS()).doesNotContain(referentielCRBack);
        assertThat(referentielCRBack.getCr()).isNull();
    }

    @Test
    void offreProduitTest() throws Exception {
        CR cR = getCRRandomSampleGenerator();
        OffreProduit offreProduitBack = getOffreProduitRandomSampleGenerator();

        cR.addOffreProduit(offreProduitBack);
        assertThat(cR.getOffreProduits()).containsOnly(offreProduitBack);
        assertThat(offreProduitBack.getCr()).isEqualTo(cR);

        cR.removeOffreProduit(offreProduitBack);
        assertThat(cR.getOffreProduits()).doesNotContain(offreProduitBack);
        assertThat(offreProduitBack.getCr()).isNull();

        cR.offreProduits(new HashSet<>(Set.of(offreProduitBack)));
        assertThat(cR.getOffreProduits()).containsOnly(offreProduitBack);
        assertThat(offreProduitBack.getCr()).isEqualTo(cR);

        cR.setOffreProduits(new HashSet<>());
        assertThat(cR.getOffreProduits()).doesNotContain(offreProduitBack);
        assertThat(offreProduitBack.getCr()).isNull();
    }
}
