package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TpeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Tpe getTpeSample1() {
        return new Tpe().id(1L).imageTpe("imageTpe1").descriptif("descriptif1");
    }

    public static Tpe getTpeSample2() {
        return new Tpe().id(2L).imageTpe("imageTpe2").descriptif("descriptif2");
    }

    public static Tpe getTpeRandomSampleGenerator() {
        return new Tpe().id(longCount.incrementAndGet()).imageTpe(UUID.randomUUID().toString()).descriptif(UUID.randomUUID().toString());
    }
}
