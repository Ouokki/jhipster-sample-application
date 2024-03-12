package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Tarif;
import com.mycompany.myapp.repository.TarifRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TarifResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TarifResourceIT {

    private static final String DEFAULT_TARIF_PAR_DEFAUT = "AAAAAAAAAA";
    private static final String UPDATED_TARIF_PAR_DEFAUT = "BBBBBBBBBB";

    private static final String DEFAULT_TARIF_MINIMUM = "AAAAAAAAAA";
    private static final String UPDATED_TARIF_MINIMUM = "BBBBBBBBBB";

    private static final String DEFAULT_TARIF_MAXIMUM = "AAAAAAAAAA";
    private static final String UPDATED_TARIF_MAXIMUM = "BBBBBBBBBB";

    private static final String DEFAULT_UNITE = "AAAAAAAAAA";
    private static final String UPDATED_UNITE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tarifs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TarifRepository tarifRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTarifMockMvc;

    private Tarif tarif;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarif createEntity(EntityManager em) {
        Tarif tarif = new Tarif()
            .tarifParDefaut(DEFAULT_TARIF_PAR_DEFAUT)
            .tarifMinimum(DEFAULT_TARIF_MINIMUM)
            .tarifMaximum(DEFAULT_TARIF_MAXIMUM)
            .unite(DEFAULT_UNITE);
        return tarif;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tarif createUpdatedEntity(EntityManager em) {
        Tarif tarif = new Tarif()
            .tarifParDefaut(UPDATED_TARIF_PAR_DEFAUT)
            .tarifMinimum(UPDATED_TARIF_MINIMUM)
            .tarifMaximum(UPDATED_TARIF_MAXIMUM)
            .unite(UPDATED_UNITE);
        return tarif;
    }

    @BeforeEach
    public void initTest() {
        tarif = createEntity(em);
    }

    @Test
    @Transactional
    void createTarif() throws Exception {
        int databaseSizeBeforeCreate = tarifRepository.findAll().size();
        // Create the Tarif
        restTarifMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarif)))
            .andExpect(status().isCreated());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeCreate + 1);
        Tarif testTarif = tarifList.get(tarifList.size() - 1);
        assertThat(testTarif.getTarifParDefaut()).isEqualTo(DEFAULT_TARIF_PAR_DEFAUT);
        assertThat(testTarif.getTarifMinimum()).isEqualTo(DEFAULT_TARIF_MINIMUM);
        assertThat(testTarif.getTarifMaximum()).isEqualTo(DEFAULT_TARIF_MAXIMUM);
        assertThat(testTarif.getUnite()).isEqualTo(DEFAULT_UNITE);
    }

    @Test
    @Transactional
    void createTarifWithExistingId() throws Exception {
        // Create the Tarif with an existing ID
        tarif.setId(1L);

        int databaseSizeBeforeCreate = tarifRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarifMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarif)))
            .andExpect(status().isBadRequest());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTarifs() throws Exception {
        // Initialize the database
        tarifRepository.saveAndFlush(tarif);

        // Get all the tarifList
        restTarifMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarif.getId().intValue())))
            .andExpect(jsonPath("$.[*].tarifParDefaut").value(hasItem(DEFAULT_TARIF_PAR_DEFAUT)))
            .andExpect(jsonPath("$.[*].tarifMinimum").value(hasItem(DEFAULT_TARIF_MINIMUM)))
            .andExpect(jsonPath("$.[*].tarifMaximum").value(hasItem(DEFAULT_TARIF_MAXIMUM)))
            .andExpect(jsonPath("$.[*].unite").value(hasItem(DEFAULT_UNITE)));
    }

    @Test
    @Transactional
    void getTarif() throws Exception {
        // Initialize the database
        tarifRepository.saveAndFlush(tarif);

        // Get the tarif
        restTarifMockMvc
            .perform(get(ENTITY_API_URL_ID, tarif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tarif.getId().intValue()))
            .andExpect(jsonPath("$.tarifParDefaut").value(DEFAULT_TARIF_PAR_DEFAUT))
            .andExpect(jsonPath("$.tarifMinimum").value(DEFAULT_TARIF_MINIMUM))
            .andExpect(jsonPath("$.tarifMaximum").value(DEFAULT_TARIF_MAXIMUM))
            .andExpect(jsonPath("$.unite").value(DEFAULT_UNITE));
    }

    @Test
    @Transactional
    void getNonExistingTarif() throws Exception {
        // Get the tarif
        restTarifMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTarif() throws Exception {
        // Initialize the database
        tarifRepository.saveAndFlush(tarif);

        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();

        // Update the tarif
        Tarif updatedTarif = tarifRepository.findById(tarif.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTarif are not directly saved in db
        em.detach(updatedTarif);
        updatedTarif
            .tarifParDefaut(UPDATED_TARIF_PAR_DEFAUT)
            .tarifMinimum(UPDATED_TARIF_MINIMUM)
            .tarifMaximum(UPDATED_TARIF_MAXIMUM)
            .unite(UPDATED_UNITE);

        restTarifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTarif.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTarif))
            )
            .andExpect(status().isOk());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
        Tarif testTarif = tarifList.get(tarifList.size() - 1);
        assertThat(testTarif.getTarifParDefaut()).isEqualTo(UPDATED_TARIF_PAR_DEFAUT);
        assertThat(testTarif.getTarifMinimum()).isEqualTo(UPDATED_TARIF_MINIMUM);
        assertThat(testTarif.getTarifMaximum()).isEqualTo(UPDATED_TARIF_MAXIMUM);
        assertThat(testTarif.getUnite()).isEqualTo(UPDATED_UNITE);
    }

    @Test
    @Transactional
    void putNonExistingTarif() throws Exception {
        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();
        tarif.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tarif.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTarif() throws Exception {
        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();
        tarif.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTarif() throws Exception {
        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();
        tarif.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarif)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTarifWithPatch() throws Exception {
        // Initialize the database
        tarifRepository.saveAndFlush(tarif);

        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();

        // Update the tarif using partial update
        Tarif partialUpdatedTarif = new Tarif();
        partialUpdatedTarif.setId(tarif.getId());

        partialUpdatedTarif.tarifParDefaut(UPDATED_TARIF_PAR_DEFAUT).tarifMinimum(UPDATED_TARIF_MINIMUM);

        restTarifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarif))
            )
            .andExpect(status().isOk());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
        Tarif testTarif = tarifList.get(tarifList.size() - 1);
        assertThat(testTarif.getTarifParDefaut()).isEqualTo(UPDATED_TARIF_PAR_DEFAUT);
        assertThat(testTarif.getTarifMinimum()).isEqualTo(UPDATED_TARIF_MINIMUM);
        assertThat(testTarif.getTarifMaximum()).isEqualTo(DEFAULT_TARIF_MAXIMUM);
        assertThat(testTarif.getUnite()).isEqualTo(DEFAULT_UNITE);
    }

    @Test
    @Transactional
    void fullUpdateTarifWithPatch() throws Exception {
        // Initialize the database
        tarifRepository.saveAndFlush(tarif);

        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();

        // Update the tarif using partial update
        Tarif partialUpdatedTarif = new Tarif();
        partialUpdatedTarif.setId(tarif.getId());

        partialUpdatedTarif
            .tarifParDefaut(UPDATED_TARIF_PAR_DEFAUT)
            .tarifMinimum(UPDATED_TARIF_MINIMUM)
            .tarifMaximum(UPDATED_TARIF_MAXIMUM)
            .unite(UPDATED_UNITE);

        restTarifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarif))
            )
            .andExpect(status().isOk());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
        Tarif testTarif = tarifList.get(tarifList.size() - 1);
        assertThat(testTarif.getTarifParDefaut()).isEqualTo(UPDATED_TARIF_PAR_DEFAUT);
        assertThat(testTarif.getTarifMinimum()).isEqualTo(UPDATED_TARIF_MINIMUM);
        assertThat(testTarif.getTarifMaximum()).isEqualTo(UPDATED_TARIF_MAXIMUM);
        assertThat(testTarif.getUnite()).isEqualTo(UPDATED_UNITE);
    }

    @Test
    @Transactional
    void patchNonExistingTarif() throws Exception {
        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();
        tarif.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tarif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTarif() throws Exception {
        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();
        tarif.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarif))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTarif() throws Exception {
        int databaseSizeBeforeUpdate = tarifRepository.findAll().size();
        tarif.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tarif)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tarif in the database
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTarif() throws Exception {
        // Initialize the database
        tarifRepository.saveAndFlush(tarif);

        int databaseSizeBeforeDelete = tarifRepository.findAll().size();

        // Delete the tarif
        restTarifMockMvc
            .perform(delete(ENTITY_API_URL_ID, tarif.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tarif> tarifList = tarifRepository.findAll();
        assertThat(tarifList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
