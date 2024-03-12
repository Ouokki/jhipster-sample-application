package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.OptionProduitCommerces;
import com.mycompany.myapp.repository.OptionProduitCommercesRepository;
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
 * Integration tests for the {@link OptionProduitCommercesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OptionProduitCommercesResourceIT {

    private static final String ENTITY_API_URL = "/api/option-produit-commerces";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OptionProduitCommercesRepository optionProduitCommercesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOptionProduitCommercesMockMvc;

    private OptionProduitCommerces optionProduitCommerces;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OptionProduitCommerces createEntity(EntityManager em) {
        OptionProduitCommerces optionProduitCommerces = new OptionProduitCommerces();
        return optionProduitCommerces;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OptionProduitCommerces createUpdatedEntity(EntityManager em) {
        OptionProduitCommerces optionProduitCommerces = new OptionProduitCommerces();
        return optionProduitCommerces;
    }

    @BeforeEach
    public void initTest() {
        optionProduitCommerces = createEntity(em);
    }

    @Test
    @Transactional
    void createOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeCreate = optionProduitCommercesRepository.findAll().size();
        // Create the OptionProduitCommerces
        restOptionProduitCommercesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isCreated());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeCreate + 1);
        OptionProduitCommerces testOptionProduitCommerces = optionProduitCommercesList.get(optionProduitCommercesList.size() - 1);
    }

    @Test
    @Transactional
    void createOptionProduitCommercesWithExistingId() throws Exception {
        // Create the OptionProduitCommerces with an existing ID
        optionProduitCommerces.setId(1L);

        int databaseSizeBeforeCreate = optionProduitCommercesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOptionProduitCommercesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOptionProduitCommerces() throws Exception {
        // Initialize the database
        optionProduitCommercesRepository.saveAndFlush(optionProduitCommerces);

        // Get all the optionProduitCommercesList
        restOptionProduitCommercesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(optionProduitCommerces.getId().intValue())));
    }

    @Test
    @Transactional
    void getOptionProduitCommerces() throws Exception {
        // Initialize the database
        optionProduitCommercesRepository.saveAndFlush(optionProduitCommerces);

        // Get the optionProduitCommerces
        restOptionProduitCommercesMockMvc
            .perform(get(ENTITY_API_URL_ID, optionProduitCommerces.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(optionProduitCommerces.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingOptionProduitCommerces() throws Exception {
        // Get the optionProduitCommerces
        restOptionProduitCommercesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOptionProduitCommerces() throws Exception {
        // Initialize the database
        optionProduitCommercesRepository.saveAndFlush(optionProduitCommerces);

        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();

        // Update the optionProduitCommerces
        OptionProduitCommerces updatedOptionProduitCommerces = optionProduitCommercesRepository
            .findById(optionProduitCommerces.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedOptionProduitCommerces are not directly saved in db
        em.detach(updatedOptionProduitCommerces);

        restOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOptionProduitCommerces.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOptionProduitCommerces))
            )
            .andExpect(status().isOk());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
        OptionProduitCommerces testOptionProduitCommerces = optionProduitCommercesList.get(optionProduitCommercesList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();
        optionProduitCommerces.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, optionProduitCommerces.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();
        optionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();
        optionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOptionProduitCommercesWithPatch() throws Exception {
        // Initialize the database
        optionProduitCommercesRepository.saveAndFlush(optionProduitCommerces);

        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();

        // Update the optionProduitCommerces using partial update
        OptionProduitCommerces partialUpdatedOptionProduitCommerces = new OptionProduitCommerces();
        partialUpdatedOptionProduitCommerces.setId(optionProduitCommerces.getId());

        restOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOptionProduitCommerces.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOptionProduitCommerces))
            )
            .andExpect(status().isOk());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
        OptionProduitCommerces testOptionProduitCommerces = optionProduitCommercesList.get(optionProduitCommercesList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateOptionProduitCommercesWithPatch() throws Exception {
        // Initialize the database
        optionProduitCommercesRepository.saveAndFlush(optionProduitCommerces);

        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();

        // Update the optionProduitCommerces using partial update
        OptionProduitCommerces partialUpdatedOptionProduitCommerces = new OptionProduitCommerces();
        partialUpdatedOptionProduitCommerces.setId(optionProduitCommerces.getId());

        restOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOptionProduitCommerces.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOptionProduitCommerces))
            )
            .andExpect(status().isOk());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
        OptionProduitCommerces testOptionProduitCommerces = optionProduitCommercesList.get(optionProduitCommercesList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();
        optionProduitCommerces.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, optionProduitCommerces.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();
        optionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = optionProduitCommercesRepository.findAll().size();
        optionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(optionProduitCommerces))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OptionProduitCommerces in the database
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOptionProduitCommerces() throws Exception {
        // Initialize the database
        optionProduitCommercesRepository.saveAndFlush(optionProduitCommerces);

        int databaseSizeBeforeDelete = optionProduitCommercesRepository.findAll().size();

        // Delete the optionProduitCommerces
        restOptionProduitCommercesMockMvc
            .perform(delete(ENTITY_API_URL_ID, optionProduitCommerces.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OptionProduitCommerces> optionProduitCommercesList = optionProduitCommercesRepository.findAll();
        assertThat(optionProduitCommercesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
