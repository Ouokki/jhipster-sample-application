package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class OffreProduitTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static OffreProduit getOffreProduitSample1() {
        return new OffreProduit().id(1L);
    }

    public static OffreProduit getOffreProduitSample2() {
        return new OffreProduit().id(2L);
    }

    public static OffreProduit getOffreProduitRandomSampleGenerator() {
        return new OffreProduit().id(longCount.incrementAndGet());
    }
}
