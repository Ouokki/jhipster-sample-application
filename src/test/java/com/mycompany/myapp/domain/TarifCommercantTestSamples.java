package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TarifCommercantTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static TarifCommercant getTarifCommercantSample1() {
        return new TarifCommercant().id(1L).nomCommission("nomCommission1").champMatrice("champMatrice1");
    }

    public static TarifCommercant getTarifCommercantSample2() {
        return new TarifCommercant().id(2L).nomCommission("nomCommission2").champMatrice("champMatrice2");
    }

    public static TarifCommercant getTarifCommercantRandomSampleGenerator() {
        return new TarifCommercant()
            .id(longCount.incrementAndGet())
            .nomCommission(UUID.randomUUID().toString())
            .champMatrice(UUID.randomUUID().toString());
    }
}
