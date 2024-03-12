package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TarifTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Tarif getTarifSample1() {
        return new Tarif()
            .id(1L)
            .tarifParDefaut("tarifParDefaut1")
            .tarifMinimum("tarifMinimum1")
            .tarifMaximum("tarifMaximum1")
            .unite("unite1");
    }

    public static Tarif getTarifSample2() {
        return new Tarif()
            .id(2L)
            .tarifParDefaut("tarifParDefaut2")
            .tarifMinimum("tarifMinimum2")
            .tarifMaximum("tarifMaximum2")
            .unite("unite2");
    }

    public static Tarif getTarifRandomSampleGenerator() {
        return new Tarif()
            .id(longCount.incrementAndGet())
            .tarifParDefaut(UUID.randomUUID().toString())
            .tarifMinimum(UUID.randomUUID().toString())
            .tarifMaximum(UUID.randomUUID().toString())
            .unite(UUID.randomUUID().toString());
    }
}
