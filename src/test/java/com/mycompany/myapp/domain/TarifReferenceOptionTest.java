package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OptionProduitCommercesTestSamples.*;
import static com.mycompany.myapp.domain.ReferenceOptionProduitCommercesTestSamples.*;
import static com.mycompany.myapp.domain.TarifReferenceOptionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TarifReferenceOptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TarifReferenceOption.class);
        TarifReferenceOption tarifReferenceOption1 = getTarifReferenceOptionSample1();
        TarifReferenceOption tarifReferenceOption2 = new TarifReferenceOption();
        assertThat(tarifReferenceOption1).isNotEqualTo(tarifReferenceOption2);

        tarifReferenceOption2.setId(tarifReferenceOption1.getId());
        assertThat(tarifReferenceOption1).isEqualTo(tarifReferenceOption2);

        tarifReferenceOption2 = getTarifReferenceOptionSample2();
        assertThat(tarifReferenceOption1).isNotEqualTo(tarifReferenceOption2);
    }

    @Test
    void referenceOptionProduitCommercesTest() throws Exception {
        TarifReferenceOption tarifReferenceOption = getTarifReferenceOptionRandomSampleGenerator();
        ReferenceOptionProduitCommerces referenceOptionProduitCommercesBack = getReferenceOptionProduitCommercesRandomSampleGenerator();

        tarifReferenceOption.addReferenceOptionProduitCommerces(referenceOptionProduitCommercesBack);
        assertThat(tarifReferenceOption.getReferenceOptionProduitCommerces()).containsOnly(referenceOptionProduitCommercesBack);

        tarifReferenceOption.removeReferenceOptionProduitCommerces(referenceOptionProduitCommercesBack);
        assertThat(tarifReferenceOption.getReferenceOptionProduitCommerces()).doesNotContain(referenceOptionProduitCommercesBack);

        tarifReferenceOption.referenceOptionProduitCommerces(new HashSet<>(Set.of(referenceOptionProduitCommercesBack)));
        assertThat(tarifReferenceOption.getReferenceOptionProduitCommerces()).containsOnly(referenceOptionProduitCommercesBack);

        tarifReferenceOption.setReferenceOptionProduitCommerces(new HashSet<>());
        assertThat(tarifReferenceOption.getReferenceOptionProduitCommerces()).doesNotContain(referenceOptionProduitCommercesBack);
    }

    @Test
    void optionProduitCommercesTest() throws Exception {
        TarifReferenceOption tarifReferenceOption = getTarifReferenceOptionRandomSampleGenerator();
        OptionProduitCommerces optionProduitCommercesBack = getOptionProduitCommercesRandomSampleGenerator();

        tarifReferenceOption.setOptionProduitCommerces(optionProduitCommercesBack);
        assertThat(tarifReferenceOption.getOptionProduitCommerces()).isEqualTo(optionProduitCommercesBack);
        assertThat(optionProduitCommercesBack.getTarifReferenceOption()).isEqualTo(tarifReferenceOption);

        tarifReferenceOption.optionProduitCommerces(null);
        assertThat(tarifReferenceOption.getOptionProduitCommerces()).isNull();
        assertThat(optionProduitCommercesBack.getTarifReferenceOption()).isNull();
    }
}
