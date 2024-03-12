package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.OffreProduitTestSamples.*;
import static com.mycompany.myapp.domain.ProduitTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProduitTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produit.class);
        Produit produit1 = getProduitSample1();
        Produit produit2 = new Produit();
        assertThat(produit1).isNotEqualTo(produit2);

        produit2.setId(produit1.getId());
        assertThat(produit1).isEqualTo(produit2);

        produit2 = getProduitSample2();
        assertThat(produit1).isNotEqualTo(produit2);
    }

    @Test
    void offreProduitTest() throws Exception {
        Produit produit = getProduitRandomSampleGenerator();
        OffreProduit offreProduitBack = getOffreProduitRandomSampleGenerator();

        produit.addOffreProduit(offreProduitBack);
        assertThat(produit.getOffreProduits()).containsOnly(offreProduitBack);
        assertThat(offreProduitBack.getProduits()).containsOnly(produit);

        produit.removeOffreProduit(offreProduitBack);
        assertThat(produit.getOffreProduits()).doesNotContain(offreProduitBack);
        assertThat(offreProduitBack.getProduits()).doesNotContain(produit);

        produit.offreProduits(new HashSet<>(Set.of(offreProduitBack)));
        assertThat(produit.getOffreProduits()).containsOnly(offreProduitBack);
        assertThat(offreProduitBack.getProduits()).containsOnly(produit);

        produit.setOffreProduits(new HashSet<>());
        assertThat(produit.getOffreProduits()).doesNotContain(offreProduitBack);
        assertThat(offreProduitBack.getProduits()).doesNotContain(produit);
    }
}
