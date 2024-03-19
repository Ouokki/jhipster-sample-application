package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OptionProduitCommercesTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static com.mycompany.myapp.domain.TarifReferenceOptionTestSamples.*;
import static com.mycompany.myapp.domain.TarifTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
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
    void tarifTest() throws Exception {
        OptionProduitCommerces optionProduitCommerces = getOptionProduitCommercesRandomSampleGenerator();
        Tarif tarifBack = getTarifRandomSampleGenerator();

        optionProduitCommerces.setTarif(tarifBack);
        assertThat(optionProduitCommerces.getTarif()).isEqualTo(tarifBack);

        optionProduitCommerces.tarif(null);
        assertThat(optionProduitCommerces.getTarif()).isNull();
    }

    @Test
    void parametrageTest() throws Exception {
        OptionProduitCommerces optionProduitCommerces = getOptionProduitCommercesRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        optionProduitCommerces.setParametrage(parametrageBack);
        assertThat(optionProduitCommerces.getParametrage()).isEqualTo(parametrageBack);

        optionProduitCommerces.parametrage(null);
        assertThat(optionProduitCommerces.getParametrage()).isNull();
    }
}
