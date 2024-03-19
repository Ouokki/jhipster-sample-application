package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class LogicielTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Logiciel getLogicielSample1() {
        return new Logiciel().id(1L);
    }

    public static Logiciel getLogicielSample2() {
        return new Logiciel().id(2L);
    }

    public static Logiciel getLogicielRandomSampleGenerator() {
        return new Logiciel().id(longCount.incrementAndGet());
    }
}
