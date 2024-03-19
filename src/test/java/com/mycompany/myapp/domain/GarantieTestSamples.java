package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class GarantieTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Garantie getGarantieSample1() {
        return new Garantie()
            .id(1L)
            .montantAutorisationTransaction("montantAutorisationTransaction1")
            .montantAutorisationTPE("montantAutorisationTPE1")
            .delaiRemise("delaiRemise1")
            .delaiCommunicationJustificatif("delaiCommunicationJustificatif1");
    }

    public static Garantie getGarantieSample2() {
        return new Garantie()
            .id(2L)
            .montantAutorisationTransaction("montantAutorisationTransaction2")
            .montantAutorisationTPE("montantAutorisationTPE2")
            .delaiRemise("delaiRemise2")
            .delaiCommunicationJustificatif("delaiCommunicationJustificatif2");
    }

    public static Garantie getGarantieRandomSampleGenerator() {
        return new Garantie()
            .id(longCount.incrementAndGet())
            .montantAutorisationTransaction(UUID.randomUUID().toString())
            .montantAutorisationTPE(UUID.randomUUID().toString())
            .delaiRemise(UUID.randomUUID().toString())
            .delaiCommunicationJustificatif(UUID.randomUUID().toString());
    }
}
