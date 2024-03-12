package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ProduitTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Produit getProduitSample1() {
        return new Produit().id(1L).codeProduit("codeProduit1").libelleProduit("libelleProduit1");
    }

    public static Produit getProduitSample2() {
        return new Produit().id(2L).codeProduit("codeProduit2").libelleProduit("libelleProduit2");
    }

    public static Produit getProduitRandomSampleGenerator() {
        return new Produit()
            .id(longCount.incrementAndGet())
            .codeProduit(UUID.randomUUID().toString())
            .libelleProduit(UUID.randomUUID().toString());
    }
}
