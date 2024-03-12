package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class FdoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Fdo getFdoSample1() {
        return new Fdo().id(1L);
    }

    public static Fdo getFdoSample2() {
        return new Fdo().id(2L);
    }

    public static Fdo getFdoRandomSampleGenerator() {
        return new Fdo().id(longCount.incrementAndGet());
    }
}
