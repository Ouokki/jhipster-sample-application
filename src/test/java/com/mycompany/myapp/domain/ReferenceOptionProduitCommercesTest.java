package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ReferenceOptionProduitCommercesTestSamples.*;
import static com.mycompany.myapp.domain.TarifReferenceOptionTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ReferenceOptionProduitCommercesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReferenceOptionProduitCommerces.class);
        ReferenceOptionProduitCommerces referenceOptionProduitCommerces1 = getReferenceOptionProduitCommercesSample1();
        ReferenceOptionProduitCommerces referenceOptionProduitCommerces2 = new ReferenceOptionProduitCommerces();
        assertThat(referenceOptionProduitCommerces1).isNotEqualTo(referenceOptionProduitCommerces2);

        referenceOptionProduitCommerces2.setId(referenceOptionProduitCommerces1.getId());
        assertThat(referenceOptionProduitCommerces1).isEqualTo(referenceOptionProduitCommerces2);

        referenceOptionProduitCommerces2 = getReferenceOptionProduitCommercesSample2();
        assertThat(referenceOptionProduitCommerces1).isNotEqualTo(referenceOptionProduitCommerces2);
    }

    @Test
    void tarifReferenceOptionTest() throws Exception {
        ReferenceOptionProduitCommerces referenceOptionProduitCommerces = getReferenceOptionProduitCommercesRandomSampleGenerator();
        TarifReferenceOption tarifReferenceOptionBack = getTarifReferenceOptionRandomSampleGenerator();

        referenceOptionProduitCommerces.addTarifReferenceOption(tarifReferenceOptionBack);
        assertThat(referenceOptionProduitCommerces.getTarifReferenceOptions()).containsOnly(tarifReferenceOptionBack);
        assertThat(tarifReferenceOptionBack.getReferenceOptionProduitCommerces()).containsOnly(referenceOptionProduitCommerces);

        referenceOptionProduitCommerces.removeTarifReferenceOption(tarifReferenceOptionBack);
        assertThat(referenceOptionProduitCommerces.getTarifReferenceOptions()).doesNotContain(tarifReferenceOptionBack);
        assertThat(tarifReferenceOptionBack.getReferenceOptionProduitCommerces()).doesNotContain(referenceOptionProduitCommerces);

        referenceOptionProduitCommerces.tarifReferenceOptions(new HashSet<>(Set.of(tarifReferenceOptionBack)));
        assertThat(referenceOptionProduitCommerces.getTarifReferenceOptions()).containsOnly(tarifReferenceOptionBack);
        assertThat(tarifReferenceOptionBack.getReferenceOptionProduitCommerces()).containsOnly(referenceOptionProduitCommerces);

        referenceOptionProduitCommerces.setTarifReferenceOptions(new HashSet<>());
        assertThat(referenceOptionProduitCommerces.getTarifReferenceOptions()).doesNotContain(tarifReferenceOptionBack);
        assertThat(tarifReferenceOptionBack.getReferenceOptionProduitCommerces()).doesNotContain(referenceOptionProduitCommerces);
    }
}
