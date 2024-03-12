package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OptionProduitCommercesTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static com.mycompany.myapp.domain.TarifReferenceOptionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class OptionProduitCommercesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OptionProduitCommerces.class);
        OptionProduitCommerces optionProduitCommerces1 = getOptionProduitCommercesSample1();
        OptionProduitCommerces optionProduitCommerces2 = new OptionProduitCommerces();
        assertThat(optionProduitCommerces1).isNotEqualTo(optionProduitCommerces2);

        optionProduitCommerces2.setId(optionProduitCommerces1.getId());
        assertThat(optionProduitCommerces1).isEqualTo(optionProduitCommerces2);

        optionProduitCommerces2 = getOptionProduitCommercesSample2();
        assertThat(optionProduitCommerces1).isNotEqualTo(optionProduitCommerces2);
    }

    @Test
    void tarifReferenceOptionTest() throws Exception {
        OptionProduitCommerces optionProduitCommerces = getOptionProduitCommercesRandomSampleGenerator();
        TarifReferenceOption tarifReferenceOptionBack = getTarifReferenceOptionRandomSampleGenerator();

        optionProduitCommerces.setTarifReferenceOption(tarifReferenceOptionBack);
        assertThat(optionProduitCommerces.getTarifReferenceOption()).isEqualTo(tarifReferenceOptionBack);

        optionProduitCommerces.tarifReferenceOption(null);
        assertThat(optionProduitCommerces.getTarifReferenceOption()).isNull();
    }

    @Test
    void parametrageTest() throws Exception {
        OptionProduitCommerces optionProduitCommerces = getOptionProduitCommercesRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        optionProduitCommerces.addParametrage(parametrageBack);
        assertThat(optionProduitCommerces.getParametrages()).containsOnly(parametrageBack);
        assertThat(parametrageBack.getOptionProduitCommerces()).isEqualTo(optionProduitCommerces);

        optionProduitCommerces.removeParametrage(parametrageBack);
        assertThat(optionProduitCommerces.getParametrages()).doesNotContain(parametrageBack);
        assertThat(parametrageBack.getOptionProduitCommerces()).isNull();

        optionProduitCommerces.parametrages(new HashSet<>(Set.of(parametrageBack)));
        assertThat(optionProduitCommerces.getParametrages()).containsOnly(parametrageBack);
        assertThat(parametrageBack.getOptionProduitCommerces()).isEqualTo(optionProduitCommerces);

        optionProduitCommerces.setParametrages(new HashSet<>());
        assertThat(optionProduitCommerces.getParametrages()).doesNotContain(parametrageBack);
        assertThat(parametrageBack.getOptionProduitCommerces()).isNull();
    }
}
