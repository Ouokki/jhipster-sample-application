package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.CRTestSamples.*;
import static com.mycompany.myapp.domain.OffreProduitTestSamples.*;
import static com.mycompany.myapp.domain.OffreTestSamples.*;
import static com.mycompany.myapp.domain.ParametrageTestSamples.*;
import static com.mycompany.myapp.domain.ProduitTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class OffreProduitTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OffreProduit.class);
        OffreProduit offreProduit1 = getOffreProduitSample1();
        OffreProduit offreProduit2 = new OffreProduit();
        assertThat(offreProduit1).isNotEqualTo(offreProduit2);

        offreProduit2.setId(offreProduit1.getId());
        assertThat(offreProduit1).isEqualTo(offreProduit2);

        offreProduit2 = getOffreProduitSample2();
        assertThat(offreProduit1).isNotEqualTo(offreProduit2);
    }

    @Test
    void parametrageTest() throws Exception {
        OffreProduit offreProduit = getOffreProduitRandomSampleGenerator();
        Parametrage parametrageBack = getParametrageRandomSampleGenerator();

        offreProduit.setParametrage(parametrageBack);
        assertThat(offreProduit.getParametrage()).isEqualTo(parametrageBack);

        offreProduit.parametrage(null);
        assertThat(offreProduit.getParametrage()).isNull();
    }

    @Test
    void crTest() throws Exception {
        OffreProduit offreProduit = getOffreProduitRandomSampleGenerator();
        CR cRBack = getCRRandomSampleGenerator();

        offreProduit.setCr(cRBack);
        assertThat(offreProduit.getCr()).isEqualTo(cRBack);

        offreProduit.cr(null);
        assertThat(offreProduit.getCr()).isNull();
    }

    @Test
    void offreTest() throws Exception {
        OffreProduit offreProduit = getOffreProduitRandomSampleGenerator();
        Offre offreBack = getOffreRandomSampleGenerator();

        offreProduit.addOffre(offreBack);
        assertThat(offreProduit.getOffres()).containsOnly(offreBack);

        offreProduit.removeOffre(offreBack);
        assertThat(offreProduit.getOffres()).doesNotContain(offreBack);

        offreProduit.offres(new HashSet<>(Set.of(offreBack)));
        assertThat(offreProduit.getOffres()).containsOnly(offreBack);

        offreProduit.setOffres(new HashSet<>());
        assertThat(offreProduit.getOffres()).doesNotContain(offreBack);
    }

    @Test
    void produitTest() throws Exception {
        OffreProduit offreProduit = getOffreProduitRandomSampleGenerator();
        Produit produitBack = getProduitRandomSampleGenerator();

        offreProduit.addProduit(produitBack);
        assertThat(offreProduit.getProduits()).containsOnly(produitBack);

        offreProduit.removeProduit(produitBack);
        assertThat(offreProduit.getProduits()).doesNotContain(produitBack);

        offreProduit.produits(new HashSet<>(Set.of(produitBack)));
        assertThat(offreProduit.getProduits()).containsOnly(produitBack);

        offreProduit.setProduits(new HashSet<>());
        assertThat(offreProduit.getProduits()).doesNotContain(produitBack);
    }
}
