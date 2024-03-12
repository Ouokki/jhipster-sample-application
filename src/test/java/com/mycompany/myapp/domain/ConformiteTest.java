package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ConformiteTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConformiteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conformite.class);
        Conformite conformite1 = getConformiteSample1();
        Conformite conformite2 = new Conformite();
        assertThat(conformite1).isNotEqualTo(conformite2);

        conformite2.setId(conformite1.getId());
        assertThat(conformite1).isEqualTo(conformite2);

        conformite2 = getConformiteSample2();
        assertThat(conformite1).isNotEqualTo(conformite2);
    }

    @Test
    void parametrageTest() throws Exception {
        Conformite conformite = getConformiteRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        conformite.setParametrage(parametrageBack);
        assertThat(conformite.getParametrage()).isEqualTo(parametrageBack);

        conformite.parametrage(null);
        assertThat(conformite.getParametrage()).isNull();
    }
}
