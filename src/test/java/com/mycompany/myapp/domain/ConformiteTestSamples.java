package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ConformiteTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Conformite getConformiteSample1() {
        return new Conformite().id(1L).lienBonita("lienBonita1");
    }

    public static Conformite getConformiteSample2() {
        return new Conformite().id(2L).lienBonita("lienBonita2");
    }

    public static Conformite getConformiteRandomSampleGenerator() {
        return new Conformite().id(longCount.incrementAndGet()).lienBonita(UUID.randomUUID().toString());
    }
}
