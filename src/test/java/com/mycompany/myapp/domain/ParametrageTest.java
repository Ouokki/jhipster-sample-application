package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ConformiteTestSamples.*;
import static com.mycompany.myapp.domain.DemandeTestSamples.*;
import static com.mycompany.myapp.domain.GarantieTestSamples.*;
import static com.mycompany.myapp.domain.OffreProduitTestSamples.*;
import static com.mycompany.myapp.domain.OptionProduitCommercesTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static com.mycompany.myapp.domain.TarifCommercantTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ParametrageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parametrage.class);
        Parametrage parametrage1 = getParametrageSample1();
        Parametrage parametrage2 = new Parametrage();
        assertThat(parametrage1).isNotEqualTo(parametrage2);

        parametrage2.setId(parametrage1.getId());
        assertThat(parametrage1).isEqualTo(parametrage2);

        parametrage2 = getParametrageSample2();
        assertThat(parametrage1).isNotEqualTo(parametrage2);
    }

    @Test
    void garantieTest() throws Exception {
        Parametrage parametrage = getParametrageRandomSampleGenerator();
        Garantie garantieBack = getGarantieRandomSampleGenerator();

        parametrage.setGarantie(garantieBack);
        assertThat(parametrage.getGarantie()).isEqualTo(garantieBack);

        parametrage.garantie(null);
        assertThat(parametrage.getGarantie()).isNull();
    }

    @Test
    void demandeTest() throws Exception {
        Parametrage parametrage = getParametrageRandomSampleGenerator();
        Demande demandeBack = getDemandeRandomSampleGenerator();

        parametrage.setDemande(demandeBack);
        assertThat(parametrage.getDemande()).isEqualTo(demandeBack);

        parametrage.demande(null);
        assertThat(parametrage.getDemande()).isNull();
    }

    @Test
    void conformiteTest() throws Exception {
        Parametrage parametrage = getParametrageRandomSampleGenerator();
        Conformite conformiteBack = getConformiteRandomSampleGenerator();

        parametrage.setConformite(conformiteBack);
        assertThat(parametrage.getConformite()).isEqualTo(conformiteBack);

        parametrage.conformite(null);
        assertThat(parametrage.getConformite()).isNull();
    }

    @Test
    void tarifCommercantTest() throws Exception {
        Parametrage parametrage = getParametrageRandomSampleGenerator();
        TarifCommercant tarifCommercantBack = getTarifCommercantRandomSampleGenerator();

        parametrage.addTarifCommercant(tarifCommercantBack);
        assertThat(parametrage.getTarifCommercants()).containsOnly(tarifCommercantBack);
        assertThat(tarifCommercantBack.getParametrage()).isEqualTo(parametrage);

        parametrage.removeTarifCommercant(tarifCommercantBack);
        assertThat(parametrage.getTarifCommercants()).doesNotContain(tarifCommercantBack);
        assertThat(tarifCommercantBack.getParametrage()).isNull();

        parametrage.tarifCommercants(new HashSet<>(Set.of(tarifCommercantBack)));
        assertThat(parametrage.getTarifCommercants()).containsOnly(tarifCommercantBack);
        assertThat(tarifCommercantBack.getParametrage()).isEqualTo(parametrage);

        parametrage.setTarifCommercants(new HashSet<>());
        assertThat(parametrage.getTarifCommercants()).doesNotContain(tarifCommercantBack);
        assertThat(tarifCommercantBack.getParametrage()).isNull();
    }

    @Test
    void optionProduitCommercesTest() throws Exception {
        Parametrage parametrage = getParametrageRandomSampleGenerator();
        OptionProduitCommerces optionProduitCommercesBack = getOptionProduitCommercesRandomSampleGenerator();

        parametrage.addOptionProduitCommerces(optionProduitCommercesBack);
        assertThat(parametrage.getOptionProduitCommerces()).containsOnly(optionProduitCommercesBack);
        assertThat(optionProduitCommercesBack.getParametrage()).isEqualTo(parametrage);

        parametrage.removeOptionProduitCommerces(optionProduitCommercesBack);
        assertThat(parametrage.getOptionProduitCommerces()).doesNotContain(optionProduitCommercesBack);
        assertThat(optionProduitCommercesBack.getParametrage()).isNull();

        parametrage.optionProduitCommerces(new HashSet<>(Set.of(optionProduitCommercesBack)));
        assertThat(parametrage.getOptionProduitCommerces()).containsOnly(optionProduitCommercesBack);
        assertThat(optionProduitCommercesBack.getParametrage()).isEqualTo(parametrage);

        parametrage.setOptionProduitCommerces(new HashSet<>());
        assertThat(parametrage.getOptionProduitCommerces()).doesNotContain(optionProduitCommercesBack);
        assertThat(optionProduitCommercesBack.getParametrage()).isNull();
    }

    @Test
    void offreProduitTest() throws Exception {
        Parametrage parametrage = getParametrageRandomSampleGenerator();
        OffreProduit offreProduitBack = getOffreProduitRandomSampleGenerator();

        parametrage.setOffreProduit(offreProduitBack);
        assertThat(parametrage.getOffreProduit()).isEqualTo(offreProduitBack);
        assertThat(offreProduitBack.getParametrage()).isEqualTo(parametrage);

        parametrage.offreProduit(null);
        assertThat(parametrage.getOffreProduit()).isNull();
        assertThat(offreProduitBack.getParametrage()).isNull();
    }
}
