package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.HistModifDemande;
import com.mycompany.myapp.repository.HistModifDemandeRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link HistModifDemandeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class HistModifDemandeResourceIT {

    private static final Instant DEFAULT_DATE_MODIFICATION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIFICATION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_TYPE_MODIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_MODIFICATION = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS_MODIFICATIONS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS_MODIFICATIONS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/hist-modif-demandes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HistModifDemandeRepository histModifDemandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHistModifDemandeMockMvc;

    private HistModifDemande histModifDemande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistModifDemande createEntity(EntityManager em) {
        HistModifDemande histModifDemande = new HistModifDemande()
            .dateModification(DEFAULT_DATE_MODIFICATION)
            .typeModification(DEFAULT_TYPE_MODIFICATION)
            .detailsModifications(DEFAULT_DETAILS_MODIFICATIONS);
        return histModifDemande;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistModifDemande createUpdatedEntity(EntityManager em) {
        HistModifDemande histModifDemande = new HistModifDemande()
            .dateModification(UPDATED_DATE_MODIFICATION)
            .typeModification(UPDATED_TYPE_MODIFICATION)
            .detailsModifications(UPDATED_DETAILS_MODIFICATIONS);
        return histModifDemande;
    }

    @BeforeEach
    public void initTest() {
        histModifDemande = createEntity(em);
    }

    @Test
    @Transactional
    void createHistModifDemande() throws Exception {
        int databaseSizeBeforeCreate = histModifDemandeRepository.findAll().size();
        // Create the HistModifDemande
        restHistModifDemandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isCreated());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeCreate + 1);
        HistModifDemande testHistModifDemande = histModifDemandeList.get(histModifDemandeList.size() - 1);
        assertThat(testHistModifDemande.getDateModification()).isEqualTo(DEFAULT_DATE_MODIFICATION);
        assertThat(testHistModifDemande.getTypeModification()).isEqualTo(DEFAULT_TYPE_MODIFICATION);
        assertThat(testHistModifDemande.getDetailsModifications()).isEqualTo(DEFAULT_DETAILS_MODIFICATIONS);
    }

    @Test
    @Transactional
    void createHistModifDemandeWithExistingId() throws Exception {
        // Create the HistModifDemande with an existing ID
        histModifDemande.setId(1L);

        int databaseSizeBeforeCreate = histModifDemandeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistModifDemandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllHistModifDemandes() throws Exception {
        // Initialize the database
        histModifDemandeRepository.saveAndFlush(histModifDemande);

        // Get all the histModifDemandeList
        restHistModifDemandeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(histModifDemande.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateModification").value(hasItem(DEFAULT_DATE_MODIFICATION.toString())))
            .andExpect(jsonPath("$.[*].typeModification").value(hasItem(DEFAULT_TYPE_MODIFICATION)))
            .andExpect(jsonPath("$.[*].detailsModifications").value(hasItem(DEFAULT_DETAILS_MODIFICATIONS)));
    }

    @Test
    @Transactional
    void getHistModifDemande() throws Exception {
        // Initialize the database
        histModifDemandeRepository.saveAndFlush(histModifDemande);

        // Get the histModifDemande
        restHistModifDemandeMockMvc
            .perform(get(ENTITY_API_URL_ID, histModifDemande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(histModifDemande.getId().intValue()))
            .andExpect(jsonPath("$.dateModification").value(DEFAULT_DATE_MODIFICATION.toString()))
            .andExpect(jsonPath("$.typeModification").value(DEFAULT_TYPE_MODIFICATION))
            .andExpect(jsonPath("$.detailsModifications").value(DEFAULT_DETAILS_MODIFICATIONS));
    }

    @Test
    @Transactional
    void getNonExistingHistModifDemande() throws Exception {
        // Get the histModifDemande
        restHistModifDemandeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHistModifDemande() throws Exception {
        // Initialize the database
        histModifDemandeRepository.saveAndFlush(histModifDemande);

        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();

        // Update the histModifDemande
        HistModifDemande updatedHistModifDemande = histModifDemandeRepository.findById(histModifDemande.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedHistModifDemande are not directly saved in db
        em.detach(updatedHistModifDemande);
        updatedHistModifDemande
            .dateModification(UPDATED_DATE_MODIFICATION)
            .typeModification(UPDATED_TYPE_MODIFICATION)
            .detailsModifications(UPDATED_DETAILS_MODIFICATIONS);

        restHistModifDemandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHistModifDemande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHistModifDemande))
            )
            .andExpect(status().isOk());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
        HistModifDemande testHistModifDemande = histModifDemandeList.get(histModifDemandeList.size() - 1);
        assertThat(testHistModifDemande.getDateModification()).isEqualTo(UPDATED_DATE_MODIFICATION);
        assertThat(testHistModifDemande.getTypeModification()).isEqualTo(UPDATED_TYPE_MODIFICATION);
        assertThat(testHistModifDemande.getDetailsModifications()).isEqualTo(UPDATED_DETAILS_MODIFICATIONS);
    }

    @Test
    @Transactional
    void putNonExistingHistModifDemande() throws Exception {
        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();
        histModifDemande.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistModifDemandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, histModifDemande.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHistModifDemande() throws Exception {
        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();
        histModifDemande.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistModifDemandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHistModifDemande() throws Exception {
        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();
        histModifDemande.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistModifDemandeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHistModifDemandeWithPatch() throws Exception {
        // Initialize the database
        histModifDemandeRepository.saveAndFlush(histModifDemande);

        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();

        // Update the histModifDemande using partial update
        HistModifDemande partialUpdatedHistModifDemande = new HistModifDemande();
        partialUpdatedHistModifDemande.setId(histModifDemande.getId());

        partialUpdatedHistModifDemande.dateModification(UPDATED_DATE_MODIFICATION).typeModification(UPDATED_TYPE_MODIFICATION);

        restHistModifDemandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHistModifDemande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHistModifDemande))
            )
            .andExpect(status().isOk());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
        HistModifDemande testHistModifDemande = histModifDemandeList.get(histModifDemandeList.size() - 1);
        assertThat(testHistModifDemande.getDateModification()).isEqualTo(UPDATED_DATE_MODIFICATION);
        assertThat(testHistModifDemande.getTypeModification()).isEqualTo(UPDATED_TYPE_MODIFICATION);
        assertThat(testHistModifDemande.getDetailsModifications()).isEqualTo(DEFAULT_DETAILS_MODIFICATIONS);
    }

    @Test
    @Transactional
    void fullUpdateHistModifDemandeWithPatch() throws Exception {
        // Initialize the database
        histModifDemandeRepository.saveAndFlush(histModifDemande);

        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();

        // Update the histModifDemande using partial update
        HistModifDemande partialUpdatedHistModifDemande = new HistModifDemande();
        partialUpdatedHistModifDemande.setId(histModifDemande.getId());

        partialUpdatedHistModifDemande
            .dateModification(UPDATED_DATE_MODIFICATION)
            .typeModification(UPDATED_TYPE_MODIFICATION)
            .detailsModifications(UPDATED_DETAILS_MODIFICATIONS);

        restHistModifDemandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHistModifDemande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHistModifDemande))
            )
            .andExpect(status().isOk());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
        HistModifDemande testHistModifDemande = histModifDemandeList.get(histModifDemandeList.size() - 1);
        assertThat(testHistModifDemande.getDateModification()).isEqualTo(UPDATED_DATE_MODIFICATION);
        assertThat(testHistModifDemande.getTypeModification()).isEqualTo(UPDATED_TYPE_MODIFICATION);
        assertThat(testHistModifDemande.getDetailsModifications()).isEqualTo(UPDATED_DETAILS_MODIFICATIONS);
    }

    @Test
    @Transactional
    void patchNonExistingHistModifDemande() throws Exception {
        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();
        histModifDemande.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistModifDemandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, histModifDemande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHistModifDemande() throws Exception {
        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();
        histModifDemande.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistModifDemandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isBadRequest());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHistModifDemande() throws Exception {
        int databaseSizeBeforeUpdate = histModifDemandeRepository.findAll().size();
        histModifDemande.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHistModifDemandeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(histModifDemande))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the HistModifDemande in the database
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHistModifDemande() throws Exception {
        // Initialize the database
        histModifDemandeRepository.saveAndFlush(histModifDemande);

        int databaseSizeBeforeDelete = histModifDemandeRepository.findAll().size();

        // Delete the histModifDemande
        restHistModifDemandeMockMvc
            .perform(delete(ENTITY_API_URL_ID, histModifDemande.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistModifDemande> histModifDemandeList = histModifDemandeRepository.findAll();
        assertThat(histModifDemandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
