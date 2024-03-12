package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class OptionProduitCommercesTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static OptionProduitCommerces getOptionProduitCommercesSample1() {
        return new OptionProduitCommerces().id(1L);
    }

    public static OptionProduitCommerces getOptionProduitCommercesSample2() {
        return new OptionProduitCommerces().id(2L);
    }

    public static OptionProduitCommerces getOptionProduitCommercesRandomSampleGenerator() {
        return new OptionProduitCommerces().id(longCount.incrementAndGet());
    }
}
