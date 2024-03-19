package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Garantie;
import com.mycompany.myapp.repository.GarantieRepository;
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
 * Integration tests for the {@link GarantieResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GarantieResourceIT {

    private static final String DEFAULT_MONTANT_AUTORISATION_TRANSACTION = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT_AUTORISATION_TRANSACTION = "BBBBBBBBBB";

    private static final String DEFAULT_MONTANT_AUTORISATION_TPE = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT_AUTORISATION_TPE = "BBBBBBBBBB";

    private static final String DEFAULT_DELAI_REMISE = "AAAAAAAAAA";
    private static final String UPDATED_DELAI_REMISE = "BBBBBBBBBB";

    private static final String DEFAULT_DELAI_COMMUNICATION_JUSTIFICATIF = "AAAAAAAAAA";
    private static final String UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/garanties";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GarantieRepository garantieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGarantieMockMvc;

    private Garantie garantie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Garantie createEntity(EntityManager em) {
        Garantie garantie = new Garantie()
            .montantAutorisationTransaction(DEFAULT_MONTANT_AUTORISATION_TRANSACTION)
            .montantAutorisationTPE(DEFAULT_MONTANT_AUTORISATION_TPE)
            .delaiRemise(DEFAULT_DELAI_REMISE)
            .delaiCommunicationJustificatif(DEFAULT_DELAI_COMMUNICATION_JUSTIFICATIF);
        return garantie;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Garantie createUpdatedEntity(EntityManager em) {
        Garantie garantie = new Garantie()
            .montantAutorisationTransaction(UPDATED_MONTANT_AUTORISATION_TRANSACTION)
            .montantAutorisationTPE(UPDATED_MONTANT_AUTORISATION_TPE)
            .delaiRemise(UPDATED_DELAI_REMISE)
            .delaiCommunicationJustificatif(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);
        return garantie;
    }

    @BeforeEach
    public void initTest() {
        garantie = createEntity(em);
    }

    @Test
    @Transactional
    void createGarantie() throws Exception {
        int databaseSizeBeforeCreate = garantieRepository.findAll().size();
        // Create the Garantie
        restGarantieMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(garantie)))
            .andExpect(status().isCreated());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeCreate + 1);
        Garantie testGarantie = garantieList.get(garantieList.size() - 1);
        assertThat(testGarantie.getMontantAutorisationTransaction()).isEqualTo(DEFAULT_MONTANT_AUTORISATION_TRANSACTION);
        assertThat(testGarantie.getMontantAutorisationTPE()).isEqualTo(DEFAULT_MONTANT_AUTORISATION_TPE);
        assertThat(testGarantie.getDelaiRemise()).isEqualTo(DEFAULT_DELAI_REMISE);
        assertThat(testGarantie.getDelaiCommunicationJustificatif()).isEqualTo(DEFAULT_DELAI_COMMUNICATION_JUSTIFICATIF);
    }

    @Test
    @Transactional
    void createGarantieWithExistingId() throws Exception {
        // Create the Garantie with an existing ID
        garantie.setId(1L);

        int databaseSizeBeforeCreate = garantieRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGarantieMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(garantie)))
            .andExpect(status().isBadRequest());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllGaranties() throws Exception {
        // Initialize the database
        garantieRepository.saveAndFlush(garantie);

        // Get all the garantieList
        restGarantieMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(garantie.getId().intValue())))
            .andExpect(jsonPath("$.[*].montantAutorisationTransaction").value(hasItem(DEFAULT_MONTANT_AUTORISATION_TRANSACTION)))
            .andExpect(jsonPath("$.[*].montantAutorisationTPE").value(hasItem(DEFAULT_MONTANT_AUTORISATION_TPE)))
            .andExpect(jsonPath("$.[*].delaiRemise").value(hasItem(DEFAULT_DELAI_REMISE)))
            .andExpect(jsonPath("$.[*].delaiCommunicationJustificatif").value(hasItem(DEFAULT_DELAI_COMMUNICATION_JUSTIFICATIF)));
    }

    @Test
    @Transactional
    void getGarantie() throws Exception {
        // Initialize the database
        garantieRepository.saveAndFlush(garantie);

        // Get the garantie
        restGarantieMockMvc
            .perform(get(ENTITY_API_URL_ID, garantie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(garantie.getId().intValue()))
            .andExpect(jsonPath("$.montantAutorisationTransaction").value(DEFAULT_MONTANT_AUTORISATION_TRANSACTION))
            .andExpect(jsonPath("$.montantAutorisationTPE").value(DEFAULT_MONTANT_AUTORISATION_TPE))
            .andExpect(jsonPath("$.delaiRemise").value(DEFAULT_DELAI_REMISE))
            .andExpect(jsonPath("$.delaiCommunicationJustificatif").value(DEFAULT_DELAI_COMMUNICATION_JUSTIFICATIF));
    }

    @Test
    @Transactional
    void getNonExistingGarantie() throws Exception {
        // Get the garantie
        restGarantieMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingGarantie() throws Exception {
        // Initialize the database
        garantieRepository.saveAndFlush(garantie);

        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();

        // Update the garantie
        Garantie updatedGarantie = garantieRepository.findById(garantie.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedGarantie are not directly saved in db
        em.detach(updatedGarantie);
        updatedGarantie
            .montantAutorisationTransaction(UPDATED_MONTANT_AUTORISATION_TRANSACTION)
            .montantAutorisationTPE(UPDATED_MONTANT_AUTORISATION_TPE)
            .delaiRemise(UPDATED_DELAI_REMISE)
            .delaiCommunicationJustificatif(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);

        restGarantieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedGarantie.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedGarantie))
            )
            .andExpect(status().isOk());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
        Garantie testGarantie = garantieList.get(garantieList.size() - 1);
        assertThat(testGarantie.getMontantAutorisationTransaction()).isEqualTo(UPDATED_MONTANT_AUTORISATION_TRANSACTION);
        assertThat(testGarantie.getMontantAutorisationTPE()).isEqualTo(UPDATED_MONTANT_AUTORISATION_TPE);
        assertThat(testGarantie.getDelaiRemise()).isEqualTo(UPDATED_DELAI_REMISE);
        assertThat(testGarantie.getDelaiCommunicationJustificatif()).isEqualTo(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);
    }

    @Test
    @Transactional
    void putNonExistingGarantie() throws Exception {
        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();
        garantie.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGarantieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, garantie.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(garantie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchGarantie() throws Exception {
        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();
        garantie.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGarantieMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(garantie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamGarantie() throws Exception {
        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();
        garantie.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGarantieMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(garantie)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateGarantieWithPatch() throws Exception {
        // Initialize the database
        garantieRepository.saveAndFlush(garantie);

        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();

        // Update the garantie using partial update
        Garantie partialUpdatedGarantie = new Garantie();
        partialUpdatedGarantie.setId(garantie.getId());

        partialUpdatedGarantie
            .montantAutorisationTransaction(UPDATED_MONTANT_AUTORISATION_TRANSACTION)
            .delaiCommunicationJustificatif(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);

        restGarantieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGarantie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGarantie))
            )
            .andExpect(status().isOk());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
        Garantie testGarantie = garantieList.get(garantieList.size() - 1);
        assertThat(testGarantie.getMontantAutorisationTransaction()).isEqualTo(UPDATED_MONTANT_AUTORISATION_TRANSACTION);
        assertThat(testGarantie.getMontantAutorisationTPE()).isEqualTo(DEFAULT_MONTANT_AUTORISATION_TPE);
        assertThat(testGarantie.getDelaiRemise()).isEqualTo(DEFAULT_DELAI_REMISE);
        assertThat(testGarantie.getDelaiCommunicationJustificatif()).isEqualTo(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);
    }

    @Test
    @Transactional
    void fullUpdateGarantieWithPatch() throws Exception {
        // Initialize the database
        garantieRepository.saveAndFlush(garantie);

        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();

        // Update the garantie using partial update
        Garantie partialUpdatedGarantie = new Garantie();
        partialUpdatedGarantie.setId(garantie.getId());

        partialUpdatedGarantie
            .montantAutorisationTransaction(UPDATED_MONTANT_AUTORISATION_TRANSACTION)
            .montantAutorisationTPE(UPDATED_MONTANT_AUTORISATION_TPE)
            .delaiRemise(UPDATED_DELAI_REMISE)
            .delaiCommunicationJustificatif(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);

        restGarantieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGarantie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGarantie))
            )
            .andExpect(status().isOk());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
        Garantie testGarantie = garantieList.get(garantieList.size() - 1);
        assertThat(testGarantie.getMontantAutorisationTransaction()).isEqualTo(UPDATED_MONTANT_AUTORISATION_TRANSACTION);
        assertThat(testGarantie.getMontantAutorisationTPE()).isEqualTo(UPDATED_MONTANT_AUTORISATION_TPE);
        assertThat(testGarantie.getDelaiRemise()).isEqualTo(UPDATED_DELAI_REMISE);
        assertThat(testGarantie.getDelaiCommunicationJustificatif()).isEqualTo(UPDATED_DELAI_COMMUNICATION_JUSTIFICATIF);
    }

    @Test
    @Transactional
    void patchNonExistingGarantie() throws Exception {
        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();
        garantie.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGarantieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, garantie.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(garantie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchGarantie() throws Exception {
        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();
        garantie.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGarantieMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(garantie))
            )
            .andExpect(status().isBadRequest());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamGarantie() throws Exception {
        int databaseSizeBeforeUpdate = garantieRepository.findAll().size();
        garantie.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGarantieMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(garantie)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Garantie in the database
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGarantie() throws Exception {
        // Initialize the database
        garantieRepository.saveAndFlush(garantie);

        int databaseSizeBeforeDelete = garantieRepository.findAll().size();

        // Delete the garantie
        restGarantieMockMvc
            .perform(delete(ENTITY_API_URL_ID, garantie.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Garantie> garantieList = garantieRepository.findAll();
        assertThat(garantieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
