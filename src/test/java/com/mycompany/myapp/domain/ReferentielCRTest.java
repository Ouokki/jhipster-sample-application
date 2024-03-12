package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CRTestSamples.*;
import static com.mycompany.myapp.domain.ReferentielCRTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReferentielCRTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReferentielCR.class);
        ReferentielCR referentielCR1 = getReferentielCRSample1();
        ReferentielCR referentielCR2 = new ReferentielCR();
        assertThat(referentielCR1).isNotEqualTo(referentielCR2);

        referentielCR2.setId(referentielCR1.getId());
        assertThat(referentielCR1).isEqualTo(referentielCR2);

        referentielCR2 = getReferentielCRSample2();
        assertThat(referentielCR1).isNotEqualTo(referentielCR2);
    }

    @Test
    void crTest() throws Exception {
        ReferentielCR referentielCR = getReferentielCRRandomSampleGenerator();
        CR cRBack = getCRRandomSampleGenerator();

        referentielCR.setCr(cRBack);
        assertThat(referentielCR.getCr()).isEqualTo(cRBack);

        referentielCR.cr(null);
        assertThat(referentielCR.getCr()).isNull();
    }
}
