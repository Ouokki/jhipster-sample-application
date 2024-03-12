package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.ReferenceOptionProduitCommerces;
import com.mycompany.myapp.repository.ReferenceOptionProduitCommercesRepository;
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
 * Integration tests for the {@link ReferenceOptionProduitCommercesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ReferenceOptionProduitCommercesResourceIT {

    private static final String DEFAULT_CODE_OPTION_PRODUIT = "AAAAAAAAAA";
    private static final String UPDATED_CODE_OPTION_PRODUIT = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_OPTION_PRODUIT = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_OPTION_PRODUIT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/reference-option-produit-commerces";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ReferenceOptionProduitCommercesRepository referenceOptionProduitCommercesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReferenceOptionProduitCommercesMockMvc;

    private ReferenceOptionProduitCommerces referenceOptionProduitCommerces;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReferenceOptionProduitCommerces createEntity(EntityManager em) {
        ReferenceOptionProduitCommerces referenceOptionProduitCommerces = new ReferenceOptionProduitCommerces()
            .codeOptionProduit(DEFAULT_CODE_OPTION_PRODUIT)
            .libelleOptionProduit(DEFAULT_LIBELLE_OPTION_PRODUIT);
        return referenceOptionProduitCommerces;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReferenceOptionProduitCommerces createUpdatedEntity(EntityManager em) {
        ReferenceOptionProduitCommerces referenceOptionProduitCommerces = new ReferenceOptionProduitCommerces()
            .codeOptionProduit(UPDATED_CODE_OPTION_PRODUIT)
            .libelleOptionProduit(UPDATED_LIBELLE_OPTION_PRODUIT);
        return referenceOptionProduitCommerces;
    }

    @BeforeEach
    public void initTest() {
        referenceOptionProduitCommerces = createEntity(em);
    }

    @Test
    @Transactional
    void createReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeCreate = referenceOptionProduitCommercesRepository.findAll().size();
        // Create the ReferenceOptionProduitCommerces
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isCreated());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeCreate + 1);
        ReferenceOptionProduitCommerces testReferenceOptionProduitCommerces = referenceOptionProduitCommercesList.get(
            referenceOptionProduitCommercesList.size() - 1
        );
        assertThat(testReferenceOptionProduitCommerces.getCodeOptionProduit()).isEqualTo(DEFAULT_CODE_OPTION_PRODUIT);
        assertThat(testReferenceOptionProduitCommerces.getLibelleOptionProduit()).isEqualTo(DEFAULT_LIBELLE_OPTION_PRODUIT);
    }

    @Test
    @Transactional
    void createReferenceOptionProduitCommercesWithExistingId() throws Exception {
        // Create the ReferenceOptionProduitCommerces with an existing ID
        referenceOptionProduitCommerces.setId(1L);

        int databaseSizeBeforeCreate = referenceOptionProduitCommercesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllReferenceOptionProduitCommerces() throws Exception {
        // Initialize the database
        referenceOptionProduitCommercesRepository.saveAndFlush(referenceOptionProduitCommerces);

        // Get all the referenceOptionProduitCommercesList
        restReferenceOptionProduitCommercesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(referenceOptionProduitCommerces.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeOptionProduit").value(hasItem(DEFAULT_CODE_OPTION_PRODUIT)))
            .andExpect(jsonPath("$.[*].libelleOptionProduit").value(hasItem(DEFAULT_LIBELLE_OPTION_PRODUIT)));
    }

    @Test
    @Transactional
    void getReferenceOptionProduitCommerces() throws Exception {
        // Initialize the database
        referenceOptionProduitCommercesRepository.saveAndFlush(referenceOptionProduitCommerces);

        // Get the referenceOptionProduitCommerces
        restReferenceOptionProduitCommercesMockMvc
            .perform(get(ENTITY_API_URL_ID, referenceOptionProduitCommerces.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(referenceOptionProduitCommerces.getId().intValue()))
            .andExpect(jsonPath("$.codeOptionProduit").value(DEFAULT_CODE_OPTION_PRODUIT))
            .andExpect(jsonPath("$.libelleOptionProduit").value(DEFAULT_LIBELLE_OPTION_PRODUIT));
    }

    @Test
    @Transactional
    void getNonExistingReferenceOptionProduitCommerces() throws Exception {
        // Get the referenceOptionProduitCommerces
        restReferenceOptionProduitCommercesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingReferenceOptionProduitCommerces() throws Exception {
        // Initialize the database
        referenceOptionProduitCommercesRepository.saveAndFlush(referenceOptionProduitCommerces);

        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();

        // Update the referenceOptionProduitCommerces
        ReferenceOptionProduitCommerces updatedReferenceOptionProduitCommerces = referenceOptionProduitCommercesRepository
            .findById(referenceOptionProduitCommerces.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedReferenceOptionProduitCommerces are not directly saved in db
        em.detach(updatedReferenceOptionProduitCommerces);
        updatedReferenceOptionProduitCommerces
            .codeOptionProduit(UPDATED_CODE_OPTION_PRODUIT)
            .libelleOptionProduit(UPDATED_LIBELLE_OPTION_PRODUIT);

        restReferenceOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedReferenceOptionProduitCommerces.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedReferenceOptionProduitCommerces))
            )
            .andExpect(status().isOk());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
        ReferenceOptionProduitCommerces testReferenceOptionProduitCommerces = referenceOptionProduitCommercesList.get(
            referenceOptionProduitCommercesList.size() - 1
        );
        assertThat(testReferenceOptionProduitCommerces.getCodeOptionProduit()).isEqualTo(UPDATED_CODE_OPTION_PRODUIT);
        assertThat(testReferenceOptionProduitCommerces.getLibelleOptionProduit()).isEqualTo(UPDATED_LIBELLE_OPTION_PRODUIT);
    }

    @Test
    @Transactional
    void putNonExistingReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();
        referenceOptionProduitCommerces.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, referenceOptionProduitCommerces.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();
        referenceOptionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();
        referenceOptionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateReferenceOptionProduitCommercesWithPatch() throws Exception {
        // Initialize the database
        referenceOptionProduitCommercesRepository.saveAndFlush(referenceOptionProduitCommerces);

        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();

        // Update the referenceOptionProduitCommerces using partial update
        ReferenceOptionProduitCommerces partialUpdatedReferenceOptionProduitCommerces = new ReferenceOptionProduitCommerces();
        partialUpdatedReferenceOptionProduitCommerces.setId(referenceOptionProduitCommerces.getId());

        partialUpdatedReferenceOptionProduitCommerces.libelleOptionProduit(UPDATED_LIBELLE_OPTION_PRODUIT);

        restReferenceOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReferenceOptionProduitCommerces.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReferenceOptionProduitCommerces))
            )
            .andExpect(status().isOk());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
        ReferenceOptionProduitCommerces testReferenceOptionProduitCommerces = referenceOptionProduitCommercesList.get(
            referenceOptionProduitCommercesList.size() - 1
        );
        assertThat(testReferenceOptionProduitCommerces.getCodeOptionProduit()).isEqualTo(DEFAULT_CODE_OPTION_PRODUIT);
        assertThat(testReferenceOptionProduitCommerces.getLibelleOptionProduit()).isEqualTo(UPDATED_LIBELLE_OPTION_PRODUIT);
    }

    @Test
    @Transactional
    void fullUpdateReferenceOptionProduitCommercesWithPatch() throws Exception {
        // Initialize the database
        referenceOptionProduitCommercesRepository.saveAndFlush(referenceOptionProduitCommerces);

        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();

        // Update the referenceOptionProduitCommerces using partial update
        ReferenceOptionProduitCommerces partialUpdatedReferenceOptionProduitCommerces = new ReferenceOptionProduitCommerces();
        partialUpdatedReferenceOptionProduitCommerces.setId(referenceOptionProduitCommerces.getId());

        partialUpdatedReferenceOptionProduitCommerces
            .codeOptionProduit(UPDATED_CODE_OPTION_PRODUIT)
            .libelleOptionProduit(UPDATED_LIBELLE_OPTION_PRODUIT);

        restReferenceOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedReferenceOptionProduitCommerces.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedReferenceOptionProduitCommerces))
            )
            .andExpect(status().isOk());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
        ReferenceOptionProduitCommerces testReferenceOptionProduitCommerces = referenceOptionProduitCommercesList.get(
            referenceOptionProduitCommercesList.size() - 1
        );
        assertThat(testReferenceOptionProduitCommerces.getCodeOptionProduit()).isEqualTo(UPDATED_CODE_OPTION_PRODUIT);
        assertThat(testReferenceOptionProduitCommerces.getLibelleOptionProduit()).isEqualTo(UPDATED_LIBELLE_OPTION_PRODUIT);
    }

    @Test
    @Transactional
    void patchNonExistingReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();
        referenceOptionProduitCommerces.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, referenceOptionProduitCommerces.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();
        referenceOptionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isBadRequest());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamReferenceOptionProduitCommerces() throws Exception {
        int databaseSizeBeforeUpdate = referenceOptionProduitCommercesRepository.findAll().size();
        referenceOptionProduitCommerces.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restReferenceOptionProduitCommercesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(referenceOptionProduitCommerces))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ReferenceOptionProduitCommerces in the database
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteReferenceOptionProduitCommerces() throws Exception {
        // Initialize the database
        referenceOptionProduitCommercesRepository.saveAndFlush(referenceOptionProduitCommerces);

        int databaseSizeBeforeDelete = referenceOptionProduitCommercesRepository.findAll().size();

        // Delete the referenceOptionProduitCommerces
        restReferenceOptionProduitCommercesMockMvc
            .perform(delete(ENTITY_API_URL_ID, referenceOptionProduitCommerces.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ReferenceOptionProduitCommerces> referenceOptionProduitCommercesList = referenceOptionProduitCommercesRepository.findAll();
        assertThat(referenceOptionProduitCommercesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
