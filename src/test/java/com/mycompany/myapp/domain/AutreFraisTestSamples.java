package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class AutreFraisTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AutreFrais getAutreFraisSample1() {
        return new AutreFrais().id(1L);
    }

    public static AutreFrais getAutreFraisSample2() {
        return new AutreFrais().id(2L);
    }

    public static AutreFrais getAutreFraisRandomSampleGenerator() {
        return new AutreFrais().id(longCount.incrementAndGet());
    }
}
