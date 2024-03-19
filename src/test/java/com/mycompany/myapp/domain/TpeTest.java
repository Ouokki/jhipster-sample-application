package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.TpeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TpeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tpe.class);
        Tpe tpe1 = getTpeSample1();
        Tpe tpe2 = new Tpe();
        assertThat(tpe1).isNotEqualTo(tpe2);

        tpe2.setId(tpe1.getId());
        assertThat(tpe1).isEqualTo(tpe2);

        tpe2 = getTpeSample2();
        assertThat(tpe1).isNotEqualTo(tpe2);
    }
}
