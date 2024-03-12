package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class HistModifDemandeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static HistModifDemande getHistModifDemandeSample1() {
        return new HistModifDemande().id(1L).typeModification("typeModification1").detailsModifications("detailsModifications1");
    }

    public static HistModifDemande getHistModifDemandeSample2() {
        return new HistModifDemande().id(2L).typeModification("typeModification2").detailsModifications("detailsModifications2");
    }

    public static HistModifDemande getHistModifDemandeRandomSampleGenerator() {
        return new HistModifDemande()
            .id(longCount.incrementAndGet())
            .typeModification(UUID.randomUUID().toString())
            .detailsModifications(UUID.randomUUID().toString());
    }
}
