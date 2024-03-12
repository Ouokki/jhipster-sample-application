package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class CRTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CR getCRSample1() {
        return new CR().id(1L);
    }

    public static CR getCRSample2() {
        return new CR().id(2L);
    }

    public static CR getCRRandomSampleGenerator() {
        return new CR().id(longCount.incrementAndGet());
    }
}
