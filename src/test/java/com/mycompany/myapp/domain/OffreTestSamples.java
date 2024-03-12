package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class OffreTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Offre getOffreSample1() {
        return new Offre()
            .id(1L)
            .codeOffre("codeOffre1")
            .libelleOffre("libelleOffre1")
            .referenceEchangeAVEM("referenceEchangeAVEM1")
            .referenceEchangeCAPS("referenceEchangeCAPS1");
    }

    public static Offre getOffreSample2() {
        return new Offre()
            .id(2L)
            .codeOffre("codeOffre2")
            .libelleOffre("libelleOffre2")
            .referenceEchangeAVEM("referenceEchangeAVEM2")
            .referenceEchangeCAPS("referenceEchangeCAPS2");
    }

    public static Offre getOffreRandomSampleGenerator() {
        return new Offre()
            .id(longCount.incrementAndGet())
            .codeOffre(UUID.randomUUID().toString())
            .libelleOffre(UUID.randomUUID().toString())
            .referenceEchangeAVEM(UUID.randomUUID().toString())
            .referenceEchangeCAPS(UUID.randomUUID().toString());
    }
}
