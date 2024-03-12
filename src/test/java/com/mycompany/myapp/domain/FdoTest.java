package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.FdoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FdoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fdo.class);
        Fdo fdo1 = getFdoSample1();
        Fdo fdo2 = new Fdo();
        assertThat(fdo1).isNotEqualTo(fdo2);

        fdo2.setId(fdo1.getId());
        assertThat(fdo1).isEqualTo(fdo2);

        fdo2 = getFdoSample2();
        assertThat(fdo1).isNotEqualTo(fdo2);
    }
}
