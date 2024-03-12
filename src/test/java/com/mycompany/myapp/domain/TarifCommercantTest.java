package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static com.mycompany.myapp.domain.TarifCommercantTestSamples.*;
import static com.mycompany.myapp.domain.TarifTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TarifCommercantTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TarifCommercant.class);
        TarifCommercant tarifCommercant1 = getTarifCommercantSample1();
        TarifCommercant tarifCommercant2 = new TarifCommercant();
        assertThat(tarifCommercant1).isNotEqualTo(tarifCommercant2);

        tarifCommercant2.setId(tarifCommercant1.getId());
        assertThat(tarifCommercant1).isEqualTo(tarifCommercant2);

        tarifCommercant2 = getTarifCommercantSample2();
        assertThat(tarifCommercant1).isNotEqualTo(tarifCommercant2);
    }

    @Test
    void tarifTest() throws Exception {
        TarifCommercant tarifCommercant = getTarifCommercantRandomSampleGenerator();
        Tarif tarifBack = getTarifRandomSampleGenerator();

        tarifCommercant.setTarif(tarifBack);
        assertThat(tarifCommercant.getTarif()).isEqualTo(tarifBack);

        tarifCommercant.tarif(null);
        assertThat(tarifCommercant.getTarif()).isNull();
    }

    @Test
    void parametrageTest() throws Exception {
        TarifCommercant tarifCommercant = getTarifCommercantRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        tarifCommercant.addParametrage(parametrageBack);
        assertThat(tarifCommercant.getParametrages()).containsOnly(parametrageBack);
        assertThat(parametrageBack.getTarifCommercant()).isEqualTo(tarifCommercant);

        tarifCommercant.removeParametrage(parametrageBack);
        assertThat(tarifCommercant.getParametrages()).doesNotContain(parametrageBack);
        assertThat(parametrageBack.getTarifCommercant()).isNull();

        tarifCommercant.parametrages(new HashSet<>(Set.of(parametrageBack)));
        assertThat(tarifCommercant.getParametrages()).containsOnly(parametrageBack);
        assertThat(parametrageBack.getTarifCommercant()).isEqualTo(tarifCommercant);

        tarifCommercant.setParametrages(new HashSet<>());
        assertThat(tarifCommercant.getParametrages()).doesNotContain(parametrageBack);
        assertThat(parametrageBack.getTarifCommercant()).isNull();
    }
}
