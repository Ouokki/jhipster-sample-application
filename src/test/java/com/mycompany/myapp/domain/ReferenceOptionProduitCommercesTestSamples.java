package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ReferenceOptionProduitCommercesTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ReferenceOptionProduitCommerces getReferenceOptionProduitCommercesSample1() {
        return new ReferenceOptionProduitCommerces()
            .id(1L)
            .codeOptionProduit("codeOptionProduit1")
            .libelleOptionProduit("libelleOptionProduit1");
    }

    public static ReferenceOptionProduitCommerces getReferenceOptionProduitCommercesSample2() {
        return new ReferenceOptionProduitCommerces()
            .id(2L)
            .codeOptionProduit("codeOptionProduit2")
            .libelleOptionProduit("libelleOptionProduit2");
    }

    public static ReferenceOptionProduitCommerces getReferenceOptionProduitCommercesRandomSampleGenerator() {
        return new ReferenceOptionProduitCommerces()
            .id(longCount.incrementAndGet())
            .codeOptionProduit(UUID.randomUUID().toString())
            .libelleOptionProduit(UUID.randomUUID().toString());
    }
}
