package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AutreFrais;
import com.mycompany.myapp.domain.enumeration.DomaineFrais;
import com.mycompany.myapp.repository.AutreFraisRepository;
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
 * Integration tests for the {@link AutreFraisResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AutreFraisResourceIT {

    private static final DomaineFrais DEFAULT_DOMAINE_FRAIS = DomaineFrais.SOUSCRIPTION;
    private static final DomaineFrais UPDATED_DOMAINE_FRAIS = DomaineFrais.MODIFICATION;

    private static final String ENTITY_API_URL = "/api/autre-frais";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AutreFraisRepository autreFraisRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAutreFraisMockMvc;

    private AutreFrais autreFrais;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutreFrais createEntity(EntityManager em) {
        AutreFrais autreFrais = new AutreFrais().domaineFrais(DEFAULT_DOMAINE_FRAIS);
        return autreFrais;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AutreFrais createUpdatedEntity(EntityManager em) {
        AutreFrais autreFrais = new AutreFrais().domaineFrais(UPDATED_DOMAINE_FRAIS);
        return autreFrais;
    }

    @BeforeEach
    public void initTest() {
        autreFrais = createEntity(em);
    }

    @Test
    @Transactional
    void createAutreFrais() throws Exception {
        int databaseSizeBeforeCreate = autreFraisRepository.findAll().size();
        // Create the AutreFrais
        restAutreFraisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(autreFrais)))
            .andExpect(status().isCreated());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeCreate + 1);
        AutreFrais testAutreFrais = autreFraisList.get(autreFraisList.size() - 1);
        assertThat(testAutreFrais.getDomaineFrais()).isEqualTo(DEFAULT_DOMAINE_FRAIS);
    }

    @Test
    @Transactional
    void createAutreFraisWithExistingId() throws Exception {
        // Create the AutreFrais with an existing ID
        autreFrais.setId(1L);

        int databaseSizeBeforeCreate = autreFraisRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutreFraisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(autreFrais)))
            .andExpect(status().isBadRequest());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAutreFrais() throws Exception {
        // Initialize the database
        autreFraisRepository.saveAndFlush(autreFrais);

        // Get all the autreFraisList
        restAutreFraisMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autreFrais.getId().intValue())))
            .andExpect(jsonPath("$.[*].domaineFrais").value(hasItem(DEFAULT_DOMAINE_FRAIS.toString())));
    }

    @Test
    @Transactional
    void getAutreFrais() throws Exception {
        // Initialize the database
        autreFraisRepository.saveAndFlush(autreFrais);

        // Get the autreFrais
        restAutreFraisMockMvc
            .perform(get(ENTITY_API_URL_ID, autreFrais.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(autreFrais.getId().intValue()))
            .andExpect(jsonPath("$.domaineFrais").value(DEFAULT_DOMAINE_FRAIS.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAutreFrais() throws Exception {
        // Get the autreFrais
        restAutreFraisMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAutreFrais() throws Exception {
        // Initialize the database
        autreFraisRepository.saveAndFlush(autreFrais);

        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();

        // Update the autreFrais
        AutreFrais updatedAutreFrais = autreFraisRepository.findById(autreFrais.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAutreFrais are not directly saved in db
        em.detach(updatedAutreFrais);
        updatedAutreFrais.domaineFrais(UPDATED_DOMAINE_FRAIS);

        restAutreFraisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAutreFrais.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAutreFrais))
            )
            .andExpect(status().isOk());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
        AutreFrais testAutreFrais = autreFraisList.get(autreFraisList.size() - 1);
        assertThat(testAutreFrais.getDomaineFrais()).isEqualTo(UPDATED_DOMAINE_FRAIS);
    }

    @Test
    @Transactional
    void putNonExistingAutreFrais() throws Exception {
        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();
        autreFrais.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutreFraisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, autreFrais.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(autreFrais))
            )
            .andExpect(status().isBadRequest());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAutreFrais() throws Exception {
        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();
        autreFrais.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutreFraisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(autreFrais))
            )
            .andExpect(status().isBadRequest());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAutreFrais() throws Exception {
        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();
        autreFrais.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutreFraisMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(autreFrais)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAutreFraisWithPatch() throws Exception {
        // Initialize the database
        autreFraisRepository.saveAndFlush(autreFrais);

        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();

        // Update the autreFrais using partial update
        AutreFrais partialUpdatedAutreFrais = new AutreFrais();
        partialUpdatedAutreFrais.setId(autreFrais.getId());

        partialUpdatedAutreFrais.domaineFrais(UPDATED_DOMAINE_FRAIS);

        restAutreFraisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAutreFrais.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAutreFrais))
            )
            .andExpect(status().isOk());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
        AutreFrais testAutreFrais = autreFraisList.get(autreFraisList.size() - 1);
        assertThat(testAutreFrais.getDomaineFrais()).isEqualTo(UPDATED_DOMAINE_FRAIS);
    }

    @Test
    @Transactional
    void fullUpdateAutreFraisWithPatch() throws Exception {
        // Initialize the database
        autreFraisRepository.saveAndFlush(autreFrais);

        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();

        // Update the autreFrais using partial update
        AutreFrais partialUpdatedAutreFrais = new AutreFrais();
        partialUpdatedAutreFrais.setId(autreFrais.getId());

        partialUpdatedAutreFrais.domaineFrais(UPDATED_DOMAINE_FRAIS);

        restAutreFraisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAutreFrais.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAutreFrais))
            )
            .andExpect(status().isOk());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
        AutreFrais testAutreFrais = autreFraisList.get(autreFraisList.size() - 1);
        assertThat(testAutreFrais.getDomaineFrais()).isEqualTo(UPDATED_DOMAINE_FRAIS);
    }

    @Test
    @Transactional
    void patchNonExistingAutreFrais() throws Exception {
        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();
        autreFrais.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutreFraisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, autreFrais.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(autreFrais))
            )
            .andExpect(status().isBadRequest());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAutreFrais() throws Exception {
        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();
        autreFrais.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutreFraisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(autreFrais))
            )
            .andExpect(status().isBadRequest());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAutreFrais() throws Exception {
        int databaseSizeBeforeUpdate = autreFraisRepository.findAll().size();
        autreFrais.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutreFraisMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(autreFrais))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AutreFrais in the database
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAutreFrais() throws Exception {
        // Initialize the database
        autreFraisRepository.saveAndFlush(autreFrais);

        int databaseSizeBeforeDelete = autreFraisRepository.findAll().size();

        // Delete the autreFrais
        restAutreFraisMockMvc
            .perform(delete(ENTITY_API_URL_ID, autreFrais.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AutreFrais> autreFraisList = autreFraisRepository.findAll();
        assertThat(autreFraisList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
