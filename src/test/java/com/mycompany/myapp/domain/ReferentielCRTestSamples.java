package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ReferentielCRTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ReferentielCR getReferentielCRSample1() {
        return new ReferentielCR().id(1L).nomCR("nomCR1").numeroCR("numeroCR1");
    }

    public static ReferentielCR getReferentielCRSample2() {
        return new ReferentielCR().id(2L).nomCR("nomCR2").numeroCR("numeroCR2");
    }

    public static ReferentielCR getReferentielCRRandomSampleGenerator() {
        return new ReferentielCR()
            .id(longCount.incrementAndGet())
            .nomCR(UUID.randomUUID().toString())
            .numeroCR(UUID.randomUUID().toString());
    }
}
