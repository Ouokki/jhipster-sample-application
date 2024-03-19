package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TarifReferenceOptionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static TarifReferenceOption getTarifReferenceOptionSample1() {
        return new TarifReferenceOption().id(1L).trigramme("trigramme1");
    }

    public static TarifReferenceOption getTarifReferenceOptionSample2() {
        return new TarifReferenceOption().id(2L).trigramme("trigramme2");
    }

    public static TarifReferenceOption getTarifReferenceOptionRandomSampleGenerator() {
        return new TarifReferenceOption().id(longCount.incrementAndGet()).trigramme(UUID.randomUUID().toString());
    }
}
