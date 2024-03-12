package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class OptionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Option getOptionSample1() {
        return new Option().id(1L);
    }

    public static Option getOptionSample2() {
        return new Option().id(2L);
    }

    public static Option getOptionRandomSampleGenerator() {
        return new Option().id(longCount.incrementAndGet());
    }
}
