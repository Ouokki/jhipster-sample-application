package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CRTestSamples.*;
import static com.mycompany.myapp.domain.ReferentielCRTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
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

        referentielCR.addCr(cRBack);
        assertThat(referentielCR.getCrs()).containsOnly(cRBack);
        assertThat(cRBack.getReferentielCR()).isEqualTo(referentielCR);

        referentielCR.removeCr(cRBack);
        assertThat(referentielCR.getCrs()).doesNotContain(cRBack);
        assertThat(cRBack.getReferentielCR()).isNull();

        referentielCR.crs(new HashSet<>(Set.of(cRBack)));
        assertThat(referentielCR.getCrs()).containsOnly(cRBack);
        assertThat(cRBack.getReferentielCR()).isEqualTo(referentielCR);

        referentielCR.setCrs(new HashSet<>());
        assertThat(referentielCR.getCrs()).doesNotContain(cRBack);
        assertThat(cRBack.getReferentielCR()).isNull();
    }
}
