package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.LogicielTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LogicielTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Logiciel.class);
        Logiciel logiciel1 = getLogicielSample1();
        Logiciel logiciel2 = new Logiciel();
        assertThat(logiciel1).isNotEqualTo(logiciel2);

        logiciel2.setId(logiciel1.getId());
        assertThat(logiciel1).isEqualTo(logiciel2);

        logiciel2 = getLogicielSample2();
        assertThat(logiciel1).isNotEqualTo(logiciel2);
    }
}
