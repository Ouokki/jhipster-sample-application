package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class ParametrageTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Parametrage getParametrageSample1() {
        return new Parametrage().id(1L);
    }

    public static Parametrage getParametrageSample2() {
        return new Parametrage().id(2L);
    }

    public static Parametrage getParametrageRandomSampleGenerator() {
        return new Parametrage().id(longCount.incrementAndGet());
    }
}
