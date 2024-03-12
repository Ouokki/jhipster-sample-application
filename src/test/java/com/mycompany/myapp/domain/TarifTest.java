package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.TarifCommercantTestSamples.*;
import static com.mycompany.myapp.domain.TarifReferenceOptionTestSamples.*;
import static com.mycompany.myapp.domain.TarifTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TarifTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tarif.class);
        Tarif tarif1 = getTarifSample1();
        Tarif tarif2 = new Tarif();
        assertThat(tarif1).isNotEqualTo(tarif2);

        tarif2.setId(tarif1.getId());
        assertThat(tarif1).isEqualTo(tarif2);

        tarif2 = getTarifSample2();
        assertThat(tarif1).isNotEqualTo(tarif2);
    }

    @Test
    void tarifReferenceOptionTest() throws Exception {
        Tarif tarif = getTarifRandomSampleGenerator();
        TarifReferenceOption tarifReferenceOptionBack = getTarifReferenceOptionRandomSampleGenerator();

        tarif.setTarifReferenceOption(tarifReferenceOptionBack);
        assertThat(tarif.getTarifReferenceOption()).isEqualTo(tarifReferenceOptionBack);

        tarif.tarifReferenceOption(null);
        assertThat(tarif.getTarifReferenceOption()).isNull();
    }

    @Test
    void tarifCommercantTest() throws Exception {
        Tarif tarif = getTarifRandomSampleGenerator();
        TarifCommercant tarifCommercantBack = getTarifCommercantRandomSampleGenerator();

        tarif.setTarifCommercant(tarifCommercantBack);
        assertThat(tarif.getTarifCommercant()).isEqualTo(tarifCommercantBack);
        assertThat(tarifCommercantBack.getTarif()).isEqualTo(tarif);

        tarif.tarifCommercant(null);
        assertThat(tarif.getTarifCommercant()).isNull();
        assertThat(tarifCommercantBack.getTarif()).isNull();
    }
}
