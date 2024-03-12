package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Parametrage;
import com.mycompany.myapp.repository.ParametrageRepository;
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
 * Integration tests for the {@link ParametrageResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ParametrageResourceIT {

    private static final String ENTITY_API_URL = "/api/parametrages";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ParametrageRepository parametrageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restParametrageMockMvc;

    private Parametrage parametrage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parametrage createEntity(EntityManager em) {
        Parametrage parametrage = new Parametrage();
        return parametrage;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parametrage createUpdatedEntity(EntityManager em) {
        Parametrage parametrage = new Parametrage();
        return parametrage;
    }

    @BeforeEach
    public void initTest() {
        parametrage = createEntity(em);
    }

    @Test
    @Transactional
    void createParametrage() throws Exception {
        int databaseSizeBeforeCreate = parametrageRepository.findAll().size();
        // Create the Parametrage
        restParametrageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parametrage)))
            .andExpect(status().isCreated());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeCreate + 1);
        Parametrage testParametrage = parametrageList.get(parametrageList.size() - 1);
    }

    @Test
    @Transactional
    void createParametrageWithExistingId() throws Exception {
        // Create the Parametrage with an existing ID
        parametrage.setId(1L);

        int databaseSizeBeforeCreate = parametrageRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restParametrageMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parametrage)))
            .andExpect(status().isBadRequest());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllParametrages() throws Exception {
        // Initialize the database
        parametrageRepository.saveAndFlush(parametrage);

        // Get all the parametrageList
        restParametrageMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parametrage.getId().intValue())));
    }

    @Test
    @Transactional
    void getParametrage() throws Exception {
        // Initialize the database
        parametrageRepository.saveAndFlush(parametrage);

        // Get the parametrage
        restParametrageMockMvc
            .perform(get(ENTITY_API_URL_ID, parametrage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(parametrage.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingParametrage() throws Exception {
        // Get the parametrage
        restParametrageMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingParametrage() throws Exception {
        // Initialize the database
        parametrageRepository.saveAndFlush(parametrage);

        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();

        // Update the parametrage
        Parametrage updatedParametrage = parametrageRepository.findById(parametrage.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedParametrage are not directly saved in db
        em.detach(updatedParametrage);

        restParametrageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedParametrage.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedParametrage))
            )
            .andExpect(status().isOk());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
        Parametrage testParametrage = parametrageList.get(parametrageList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingParametrage() throws Exception {
        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();
        parametrage.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametrageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, parametrage.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parametrage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchParametrage() throws Exception {
        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();
        parametrage.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametrageMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(parametrage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamParametrage() throws Exception {
        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();
        parametrage.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametrageMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(parametrage)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateParametrageWithPatch() throws Exception {
        // Initialize the database
        parametrageRepository.saveAndFlush(parametrage);

        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();

        // Update the parametrage using partial update
        Parametrage partialUpdatedParametrage = new Parametrage();
        partialUpdatedParametrage.setId(parametrage.getId());

        restParametrageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParametrage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedParametrage))
            )
            .andExpect(status().isOk());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
        Parametrage testParametrage = parametrageList.get(parametrageList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateParametrageWithPatch() throws Exception {
        // Initialize the database
        parametrageRepository.saveAndFlush(parametrage);

        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();

        // Update the parametrage using partial update
        Parametrage partialUpdatedParametrage = new Parametrage();
        partialUpdatedParametrage.setId(parametrage.getId());

        restParametrageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedParametrage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedParametrage))
            )
            .andExpect(status().isOk());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
        Parametrage testParametrage = parametrageList.get(parametrageList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingParametrage() throws Exception {
        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();
        parametrage.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParametrageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, parametrage.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parametrage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchParametrage() throws Exception {
        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();
        parametrage.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametrageMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(parametrage))
            )
            .andExpect(status().isBadRequest());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamParametrage() throws Exception {
        int databaseSizeBeforeUpdate = parametrageRepository.findAll().size();
        parametrage.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restParametrageMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(parametrage))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Parametrage in the database
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteParametrage() throws Exception {
        // Initialize the database
        parametrageRepository.saveAndFlush(parametrage);

        int databaseSizeBeforeDelete = parametrageRepository.findAll().size();

        // Delete the parametrage
        restParametrageMockMvc
            .perform(delete(ENTITY_API_URL_ID, parametrage.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Parametrage> parametrageList = parametrageRepository.findAll();
        assertThat(parametrageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
