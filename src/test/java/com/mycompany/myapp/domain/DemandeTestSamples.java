package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class DemandeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Demande getDemandeSample1() {
        return new Demande().id(1L);
    }

    public static Demande getDemandeSample2() {
        return new Demande().id(2L);
    }

    public static Demande getDemandeRandomSampleGenerator() {
        return new Demande().id(longCount.incrementAndGet());
    }
}
