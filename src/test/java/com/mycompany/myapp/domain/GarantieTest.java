package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.GarantieTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GarantieTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Garantie.class);
        Garantie garantie1 = getGarantieSample1();
        Garantie garantie2 = new Garantie();
        assertThat(garantie1).isNotEqualTo(garantie2);

        garantie2.setId(garantie1.getId());
        assertThat(garantie1).isEqualTo(garantie2);

        garantie2 = getGarantieSample2();
        assertThat(garantie1).isNotEqualTo(garantie2);
    }

    @Test
    void parametrageTest() throws Exception {
        Garantie garantie = getGarantieRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        garantie.setParametrage(parametrageBack);
        assertThat(garantie.getParametrage()).isEqualTo(parametrageBack);
        assertThat(parametrageBack.getGarantie()).isEqualTo(garantie);

        garantie.parametrage(null);
        assertThat(garantie.getParametrage()).isNull();
        assertThat(parametrageBack.getGarantie()).isNull();
    }
}
