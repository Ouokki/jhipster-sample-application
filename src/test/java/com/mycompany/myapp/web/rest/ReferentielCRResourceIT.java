package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ReferentielCR;
import com.mycompany.myapp.repository.ReferentielCRRepository;
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
 * Integration tests for the {@link ReferentielCRResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReferentielCRResourceIT {

    private static final String DEFAULT_NOM_CR = "AAAAAAAAAA";
    private static final String UPDATED_NOM_CR = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_CR = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/referentiel-crs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReferentielCRRepository referentielCRRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReferentielCRMockMvc;

    private ReferentielCR referentielCR;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReferentielCR createEntity(EntityManager em) {
        ReferentielCR referentielCR = new ReferentielCR().nomCR(DEFAULT_NOM_CR).numeroCR(DEFAULT_NUMERO_CR);
        return referentielCR;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReferentielCR createUpdatedEntity(EntityManager em) {
        ReferentielCR referentielCR = new ReferentielCR().nomCR(UPDATED_NOM_CR).numeroCR(UPDATED_NUMERO_CR);
        return referentielCR;
    }

    @BeforeEach
    public void initTest() {
        referentielCR = createEntity(em);
    }

    @Test
    @Transactional
    void createReferentielCR() throws Exception {
        int databaseSizeBeforeCreate = referentielCRRepository.findAll().size();
        // Create the ReferentielCR
        restReferentielCRMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(referentielCR)))
            .andExpect(status().isCreated());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeCreate + 1);
        ReferentielCR testReferentielCR = referentielCRList.get(referentielCRList.size() - 1);
        assertThat(testReferentielCR.getNomCR()).isEqualTo(DEFAULT_NOM_CR);
        assertThat(testReferentielCR.getNumeroCR()).isEqualTo(DEFAULT_NUMERO_CR);
    }

    @Test
    @Transactional
    void createReferentielCRWithExistingId() throws Exception {
        // Create the ReferentielCR with an existing ID
        referentielCR.setId(1L);

        int databaseSizeBeforeCreate = referentielCRRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferentielCRMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(referentielCR)))
            .andExpect(status().isBadRequest());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReferentielCRS() throws Exception {
        // Initialize the database
        referentielCRRepository.saveAndFlush(referentielCR);

        // Get all the referentielCRList
        restReferentielCRMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(referentielCR.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomCR").value(hasItem(DEFAULT_NOM_CR)))
            .andExpect(jsonPath("$.[*].numeroCR").value(hasItem(DEFAULT_NUMERO_CR)));
    }

    @Test
    @Transactional
    void getReferentielCR() throws Exception {
        // Initialize the database
        referentielCRRepository.saveAndFlush(referentielCR);

        // Get the referentielCR
        restReferentielCRMockMvc
            .perform(get(ENTITY_API_URL_ID, referentielCR.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(referentielCR.getId().intValue()))
            .andExpect(jsonPath("$.nomCR").value(DEFAULT_NOM_CR))
            .andExpect(jsonPath("$.numeroCR").value(DEFAULT_NUMERO_CR));
    }

    @Test
    @Transactional
    void getNonExistingReferentielCR() throws Exception {
        // Get the referentielCR
        restReferentielCRMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingReferentielCR() throws Exception {
        // Initialize the database
        referentielCRRepository.saveAndFlush(referentielCR);

        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();

        // Update the referentielCR
        ReferentielCR updatedReferentielCR = referentielCRRepository.findById(referentielCR.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedReferentielCR are not directly saved in db
        em.detach(updatedReferentielCR);
        updatedReferentielCR.nomCR(UPDATED_NOM_CR).numeroCR(UPDATED_NUMERO_CR);

        restReferentielCRMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReferentielCR.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReferentielCR))
            )
            .andExpect(status().isOk());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
        ReferentielCR testReferentielCR = referentielCRList.get(referentielCRList.size() - 1);
        assertThat(testReferentielCR.getNomCR()).isEqualTo(UPDATED_NOM_CR);
        assertThat(testReferentielCR.getNumeroCR()).isEqualTo(UPDATED_NUMERO_CR);
    }

    @Test
    @Transactional
    void putNonExistingReferentielCR() throws Exception {
        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();
        referentielCR.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferentielCRMockMvc
            .perform(
                put(ENTITY_API_URL_ID, referentielCR.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referentielCR))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReferentielCR() throws Exception {
        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();
        referentielCR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferentielCRMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referentielCR))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReferentielCR() throws Exception {
        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();
        referentielCR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferentielCRMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(referentielCR)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReferentielCRWithPatch() throws Exception {
        // Initialize the database
        referentielCRRepository.saveAndFlush(referentielCR);

        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();

        // Update the referentielCR using partial update
        ReferentielCR partialUpdatedReferentielCR = new ReferentielCR();
        partialUpdatedReferentielCR.setId(referentielCR.getId());

        partialUpdatedReferentielCR.numeroCR(UPDATED_NUMERO_CR);

        restReferentielCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReferentielCR.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReferentielCR))
            )
            .andExpect(status().isOk());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
        ReferentielCR testReferentielCR = referentielCRList.get(referentielCRList.size() - 1);
        assertThat(testReferentielCR.getNomCR()).isEqualTo(DEFAULT_NOM_CR);
        assertThat(testReferentielCR.getNumeroCR()).isEqualTo(UPDATED_NUMERO_CR);
    }

    @Test
    @Transactional
    void fullUpdateReferentielCRWithPatch() throws Exception {
        // Initialize the database
        referentielCRRepository.saveAndFlush(referentielCR);

        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();

        // Update the referentielCR using partial update
        ReferentielCR partialUpdatedReferentielCR = new ReferentielCR();
        partialUpdatedReferentielCR.setId(referentielCR.getId());

        partialUpdatedReferentielCR.nomCR(UPDATED_NOM_CR).numeroCR(UPDATED_NUMERO_CR);

        restReferentielCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReferentielCR.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReferentielCR))
            )
            .andExpect(status().isOk());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
        ReferentielCR testReferentielCR = referentielCRList.get(referentielCRList.size() - 1);
        assertThat(testReferentielCR.getNomCR()).isEqualTo(UPDATED_NOM_CR);
        assertThat(testReferentielCR.getNumeroCR()).isEqualTo(UPDATED_NUMERO_CR);
    }

    @Test
    @Transactional
    void patchNonExistingReferentielCR() throws Exception {
        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();
        referentielCR.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferentielCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, referentielCR.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(referentielCR))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReferentielCR() throws Exception {
        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();
        referentielCR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferentielCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(referentielCR))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReferentielCR() throws Exception {
        int databaseSizeBeforeUpdate = referentielCRRepository.findAll().size();
        referentielCR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferentielCRMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(referentielCR))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReferentielCR in the database
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReferentielCR() throws Exception {
        // Initialize the database
        referentielCRRepository.saveAndFlush(referentielCR);

        int databaseSizeBeforeDelete = referentielCRRepository.findAll().size();

        // Delete the referentielCR
        restReferentielCRMockMvc
            .perform(delete(ENTITY_API_URL_ID, referentielCR.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReferentielCR> referentielCRList = referentielCRRepository.findAll();
        assertThat(referentielCRList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
