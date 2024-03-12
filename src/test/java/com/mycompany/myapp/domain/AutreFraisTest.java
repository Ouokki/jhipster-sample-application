package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AutreFraisTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AutreFraisTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AutreFrais.class);
        AutreFrais autreFrais1 = getAutreFraisSample1();
        AutreFrais autreFrais2 = new AutreFrais();
        assertThat(autreFrais1).isNotEqualTo(autreFrais2);

        autreFrais2.setId(autreFrais1.getId());
        assertThat(autreFrais1).isEqualTo(autreFrais2);

        autreFrais2 = getAutreFraisSample2();
        assertThat(autreFrais1).isNotEqualTo(autreFrais2);
    }
}
