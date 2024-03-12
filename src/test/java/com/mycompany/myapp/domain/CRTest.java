package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CRTestSamples.*;
import static com.mycompany.myapp.domain.OffreProduitTestSamples.*;
import static com.mycompany.myapp.domain.ReferentielCRTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
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

        cR.setReferentielCR(referentielCRBack);
        assertThat(cR.getReferentielCR()).isEqualTo(referentielCRBack);

        cR.referentielCR(null);
        assertThat(cR.getReferentielCR()).isNull();
    }

    @Test
    void offreProduitTest() throws Exception {
        CR cR = getCRRandomSampleGenerator();
        OffreProduit offreProduitBack = getOffreProduitRandomSampleGenerator();

        cR.setOffreProduit(offreProduitBack);
        assertThat(cR.getOffreProduit()).isEqualTo(offreProduitBack);

        cR.offreProduit(null);
        assertThat(cR.getOffreProduit()).isNull();
    }
}
