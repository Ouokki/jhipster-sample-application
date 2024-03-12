package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.CR;
import com.mycompany.myapp.repository.CRRepository;
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
 * Integration tests for the {@link CRResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CRResourceIT {

    private static final Boolean DEFAULT_IS_AVEM = false;
    private static final Boolean UPDATED_IS_AVEM = true;

    private static final Boolean DEFAULT_IS_AMEX = false;
    private static final Boolean UPDATED_IS_AMEX = true;

    private static final String ENTITY_API_URL = "/api/crs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CRRepository cRRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCRMockMvc;

    private CR cR;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CR createEntity(EntityManager em) {
        CR cR = new CR().isAvem(DEFAULT_IS_AVEM).isAmex(DEFAULT_IS_AMEX);
        return cR;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CR createUpdatedEntity(EntityManager em) {
        CR cR = new CR().isAvem(UPDATED_IS_AVEM).isAmex(UPDATED_IS_AMEX);
        return cR;
    }

    @BeforeEach
    public void initTest() {
        cR = createEntity(em);
    }

    @Test
    @Transactional
    void createCR() throws Exception {
        int databaseSizeBeforeCreate = cRRepository.findAll().size();
        // Create the CR
        restCRMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cR)))
            .andExpect(status().isCreated());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeCreate + 1);
        CR testCR = cRList.get(cRList.size() - 1);
        assertThat(testCR.getIsAvem()).isEqualTo(DEFAULT_IS_AVEM);
        assertThat(testCR.getIsAmex()).isEqualTo(DEFAULT_IS_AMEX);
    }

    @Test
    @Transactional
    void createCRWithExistingId() throws Exception {
        // Create the CR with an existing ID
        cR.setId(1L);

        int databaseSizeBeforeCreate = cRRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCRMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cR)))
            .andExpect(status().isBadRequest());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCRS() throws Exception {
        // Initialize the database
        cRRepository.saveAndFlush(cR);

        // Get all the cRList
        restCRMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cR.getId().intValue())))
            .andExpect(jsonPath("$.[*].isAvem").value(hasItem(DEFAULT_IS_AVEM.booleanValue())))
            .andExpect(jsonPath("$.[*].isAmex").value(hasItem(DEFAULT_IS_AMEX.booleanValue())));
    }

    @Test
    @Transactional
    void getCR() throws Exception {
        // Initialize the database
        cRRepository.saveAndFlush(cR);

        // Get the cR
        restCRMockMvc
            .perform(get(ENTITY_API_URL_ID, cR.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cR.getId().intValue()))
            .andExpect(jsonPath("$.isAvem").value(DEFAULT_IS_AVEM.booleanValue()))
            .andExpect(jsonPath("$.isAmex").value(DEFAULT_IS_AMEX.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingCR() throws Exception {
        // Get the cR
        restCRMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCR() throws Exception {
        // Initialize the database
        cRRepository.saveAndFlush(cR);

        int databaseSizeBeforeUpdate = cRRepository.findAll().size();

        // Update the cR
        CR updatedCR = cRRepository.findById(cR.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedCR are not directly saved in db
        em.detach(updatedCR);
        updatedCR.isAvem(UPDATED_IS_AVEM).isAmex(UPDATED_IS_AMEX);

        restCRMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCR.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCR))
            )
            .andExpect(status().isOk());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
        CR testCR = cRList.get(cRList.size() - 1);
        assertThat(testCR.getIsAvem()).isEqualTo(UPDATED_IS_AVEM);
        assertThat(testCR.getIsAmex()).isEqualTo(UPDATED_IS_AMEX);
    }

    @Test
    @Transactional
    void putNonExistingCR() throws Exception {
        int databaseSizeBeforeUpdate = cRRepository.findAll().size();
        cR.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCRMockMvc
            .perform(
                put(ENTITY_API_URL_ID, cR.getId()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cR))
            )
            .andExpect(status().isBadRequest());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCR() throws Exception {
        int databaseSizeBeforeUpdate = cRRepository.findAll().size();
        cR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCRMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(cR))
            )
            .andExpect(status().isBadRequest());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCR() throws Exception {
        int databaseSizeBeforeUpdate = cRRepository.findAll().size();
        cR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCRMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(cR)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCRWithPatch() throws Exception {
        // Initialize the database
        cRRepository.saveAndFlush(cR);

        int databaseSizeBeforeUpdate = cRRepository.findAll().size();

        // Update the cR using partial update
        CR partialUpdatedCR = new CR();
        partialUpdatedCR.setId(cR.getId());

        partialUpdatedCR.isAvem(UPDATED_IS_AVEM);

        restCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCR.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCR))
            )
            .andExpect(status().isOk());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
        CR testCR = cRList.get(cRList.size() - 1);
        assertThat(testCR.getIsAvem()).isEqualTo(UPDATED_IS_AVEM);
        assertThat(testCR.getIsAmex()).isEqualTo(DEFAULT_IS_AMEX);
    }

    @Test
    @Transactional
    void fullUpdateCRWithPatch() throws Exception {
        // Initialize the database
        cRRepository.saveAndFlush(cR);

        int databaseSizeBeforeUpdate = cRRepository.findAll().size();

        // Update the cR using partial update
        CR partialUpdatedCR = new CR();
        partialUpdatedCR.setId(cR.getId());

        partialUpdatedCR.isAvem(UPDATED_IS_AVEM).isAmex(UPDATED_IS_AMEX);

        restCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCR.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCR))
            )
            .andExpect(status().isOk());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
        CR testCR = cRList.get(cRList.size() - 1);
        assertThat(testCR.getIsAvem()).isEqualTo(UPDATED_IS_AVEM);
        assertThat(testCR.getIsAmex()).isEqualTo(UPDATED_IS_AMEX);
    }

    @Test
    @Transactional
    void patchNonExistingCR() throws Exception {
        int databaseSizeBeforeUpdate = cRRepository.findAll().size();
        cR.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, cR.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cR))
            )
            .andExpect(status().isBadRequest());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCR() throws Exception {
        int databaseSizeBeforeUpdate = cRRepository.findAll().size();
        cR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCRMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(cR))
            )
            .andExpect(status().isBadRequest());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCR() throws Exception {
        int databaseSizeBeforeUpdate = cRRepository.findAll().size();
        cR.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCRMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(cR)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CR in the database
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCR() throws Exception {
        // Initialize the database
        cRRepository.saveAndFlush(cR);

        int databaseSizeBeforeDelete = cRRepository.findAll().size();

        // Delete the cR
        restCRMockMvc.perform(delete(ENTITY_API_URL_ID, cR.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CR> cRList = cRRepository.findAll();
        assertThat(cRList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
