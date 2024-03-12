package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TarifCommercant;
import com.mycompany.myapp.domain.enumeration.TypeCommissionCommercant;
import com.mycompany.myapp.repository.TarifCommercantRepository;
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
 * Integration tests for the {@link TarifCommercantResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TarifCommercantResourceIT {

    private static final TypeCommissionCommercant DEFAULT_TYPE_COMMISSION = TypeCommissionCommercant.FORFAIT;
    private static final TypeCommissionCommercant UPDATED_TYPE_COMMISSION = TypeCommissionCommercant.GRILLE;

    private static final String ENTITY_API_URL = "/api/tarif-commercants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TarifCommercantRepository tarifCommercantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTarifCommercantMockMvc;

    private TarifCommercant tarifCommercant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TarifCommercant createEntity(EntityManager em) {
        TarifCommercant tarifCommercant = new TarifCommercant().typeCommission(DEFAULT_TYPE_COMMISSION);
        return tarifCommercant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TarifCommercant createUpdatedEntity(EntityManager em) {
        TarifCommercant tarifCommercant = new TarifCommercant().typeCommission(UPDATED_TYPE_COMMISSION);
        return tarifCommercant;
    }

    @BeforeEach
    public void initTest() {
        tarifCommercant = createEntity(em);
    }

    @Test
    @Transactional
    void createTarifCommercant() throws Exception {
        int databaseSizeBeforeCreate = tarifCommercantRepository.findAll().size();
        // Create the TarifCommercant
        restTarifCommercantMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isCreated());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeCreate + 1);
        TarifCommercant testTarifCommercant = tarifCommercantList.get(tarifCommercantList.size() - 1);
        assertThat(testTarifCommercant.getTypeCommission()).isEqualTo(DEFAULT_TYPE_COMMISSION);
    }

    @Test
    @Transactional
    void createTarifCommercantWithExistingId() throws Exception {
        // Create the TarifCommercant with an existing ID
        tarifCommercant.setId(1L);

        int databaseSizeBeforeCreate = tarifCommercantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarifCommercantMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTarifCommercants() throws Exception {
        // Initialize the database
        tarifCommercantRepository.saveAndFlush(tarifCommercant);

        // Get all the tarifCommercantList
        restTarifCommercantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarifCommercant.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeCommission").value(hasItem(DEFAULT_TYPE_COMMISSION.toString())));
    }

    @Test
    @Transactional
    void getTarifCommercant() throws Exception {
        // Initialize the database
        tarifCommercantRepository.saveAndFlush(tarifCommercant);

        // Get the tarifCommercant
        restTarifCommercantMockMvc
            .perform(get(ENTITY_API_URL_ID, tarifCommercant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tarifCommercant.getId().intValue()))
            .andExpect(jsonPath("$.typeCommission").value(DEFAULT_TYPE_COMMISSION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTarifCommercant() throws Exception {
        // Get the tarifCommercant
        restTarifCommercantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTarifCommercant() throws Exception {
        // Initialize the database
        tarifCommercantRepository.saveAndFlush(tarifCommercant);

        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();

        // Update the tarifCommercant
        TarifCommercant updatedTarifCommercant = tarifCommercantRepository.findById(tarifCommercant.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTarifCommercant are not directly saved in db
        em.detach(updatedTarifCommercant);
        updatedTarifCommercant.typeCommission(UPDATED_TYPE_COMMISSION);

        restTarifCommercantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTarifCommercant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTarifCommercant))
            )
            .andExpect(status().isOk());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
        TarifCommercant testTarifCommercant = tarifCommercantList.get(tarifCommercantList.size() - 1);
        assertThat(testTarifCommercant.getTypeCommission()).isEqualTo(UPDATED_TYPE_COMMISSION);
    }

    @Test
    @Transactional
    void putNonExistingTarifCommercant() throws Exception {
        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();
        tarifCommercant.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifCommercantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tarifCommercant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTarifCommercant() throws Exception {
        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();
        tarifCommercant.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifCommercantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTarifCommercant() throws Exception {
        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();
        tarifCommercant.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifCommercantMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTarifCommercantWithPatch() throws Exception {
        // Initialize the database
        tarifCommercantRepository.saveAndFlush(tarifCommercant);

        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();

        // Update the tarifCommercant using partial update
        TarifCommercant partialUpdatedTarifCommercant = new TarifCommercant();
        partialUpdatedTarifCommercant.setId(tarifCommercant.getId());

        partialUpdatedTarifCommercant.typeCommission(UPDATED_TYPE_COMMISSION);

        restTarifCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarifCommercant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarifCommercant))
            )
            .andExpect(status().isOk());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
        TarifCommercant testTarifCommercant = tarifCommercantList.get(tarifCommercantList.size() - 1);
        assertThat(testTarifCommercant.getTypeCommission()).isEqualTo(UPDATED_TYPE_COMMISSION);
    }

    @Test
    @Transactional
    void fullUpdateTarifCommercantWithPatch() throws Exception {
        // Initialize the database
        tarifCommercantRepository.saveAndFlush(tarifCommercant);

        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();

        // Update the tarifCommercant using partial update
        TarifCommercant partialUpdatedTarifCommercant = new TarifCommercant();
        partialUpdatedTarifCommercant.setId(tarifCommercant.getId());

        partialUpdatedTarifCommercant.typeCommission(UPDATED_TYPE_COMMISSION);

        restTarifCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarifCommercant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarifCommercant))
            )
            .andExpect(status().isOk());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
        TarifCommercant testTarifCommercant = tarifCommercantList.get(tarifCommercantList.size() - 1);
        assertThat(testTarifCommercant.getTypeCommission()).isEqualTo(UPDATED_TYPE_COMMISSION);
    }

    @Test
    @Transactional
    void patchNonExistingTarifCommercant() throws Exception {
        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();
        tarifCommercant.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tarifCommercant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTarifCommercant() throws Exception {
        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();
        tarifCommercant.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTarifCommercant() throws Exception {
        int databaseSizeBeforeUpdate = tarifCommercantRepository.findAll().size();
        tarifCommercant.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifCommercant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TarifCommercant in the database
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTarifCommercant() throws Exception {
        // Initialize the database
        tarifCommercantRepository.saveAndFlush(tarifCommercant);

        int databaseSizeBeforeDelete = tarifCommercantRepository.findAll().size();

        // Delete the tarifCommercant
        restTarifCommercantMockMvc
            .perform(delete(ENTITY_API_URL_ID, tarifCommercant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TarifCommercant> tarifCommercantList = tarifCommercantRepository.findAll();
        assertThat(tarifCommercantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
