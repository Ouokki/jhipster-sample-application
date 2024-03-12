package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Conformite;
import com.mycompany.myapp.repository.ConformiteRepository;
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
 * Integration tests for the {@link ConformiteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConformiteResourceIT {

    private static final Boolean DEFAULT_AFFICHAGE = false;
    private static final Boolean UPDATED_AFFICHAGE = true;

    private static final String DEFAULT_LIEN_BONITA = "AAAAAAAAAA";
    private static final String UPDATED_LIEN_BONITA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/conformites";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConformiteRepository conformiteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConformiteMockMvc;

    private Conformite conformite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conformite createEntity(EntityManager em) {
        Conformite conformite = new Conformite().affichage(DEFAULT_AFFICHAGE).lienBonita(DEFAULT_LIEN_BONITA);
        return conformite;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conformite createUpdatedEntity(EntityManager em) {
        Conformite conformite = new Conformite().affichage(UPDATED_AFFICHAGE).lienBonita(UPDATED_LIEN_BONITA);
        return conformite;
    }

    @BeforeEach
    public void initTest() {
        conformite = createEntity(em);
    }

    @Test
    @Transactional
    void createConformite() throws Exception {
        int databaseSizeBeforeCreate = conformiteRepository.findAll().size();
        // Create the Conformite
        restConformiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(conformite)))
            .andExpect(status().isCreated());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeCreate + 1);
        Conformite testConformite = conformiteList.get(conformiteList.size() - 1);
        assertThat(testConformite.getAffichage()).isEqualTo(DEFAULT_AFFICHAGE);
        assertThat(testConformite.getLienBonita()).isEqualTo(DEFAULT_LIEN_BONITA);
    }

    @Test
    @Transactional
    void createConformiteWithExistingId() throws Exception {
        // Create the Conformite with an existing ID
        conformite.setId(1L);

        int databaseSizeBeforeCreate = conformiteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConformiteMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(conformite)))
            .andExpect(status().isBadRequest());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConformites() throws Exception {
        // Initialize the database
        conformiteRepository.saveAndFlush(conformite);

        // Get all the conformiteList
        restConformiteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conformite.getId().intValue())))
            .andExpect(jsonPath("$.[*].affichage").value(hasItem(DEFAULT_AFFICHAGE.booleanValue())))
            .andExpect(jsonPath("$.[*].lienBonita").value(hasItem(DEFAULT_LIEN_BONITA)));
    }

    @Test
    @Transactional
    void getConformite() throws Exception {
        // Initialize the database
        conformiteRepository.saveAndFlush(conformite);

        // Get the conformite
        restConformiteMockMvc
            .perform(get(ENTITY_API_URL_ID, conformite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(conformite.getId().intValue()))
            .andExpect(jsonPath("$.affichage").value(DEFAULT_AFFICHAGE.booleanValue()))
            .andExpect(jsonPath("$.lienBonita").value(DEFAULT_LIEN_BONITA));
    }

    @Test
    @Transactional
    void getNonExistingConformite() throws Exception {
        // Get the conformite
        restConformiteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingConformite() throws Exception {
        // Initialize the database
        conformiteRepository.saveAndFlush(conformite);

        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();

        // Update the conformite
        Conformite updatedConformite = conformiteRepository.findById(conformite.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedConformite are not directly saved in db
        em.detach(updatedConformite);
        updatedConformite.affichage(UPDATED_AFFICHAGE).lienBonita(UPDATED_LIEN_BONITA);

        restConformiteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConformite.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConformite))
            )
            .andExpect(status().isOk());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
        Conformite testConformite = conformiteList.get(conformiteList.size() - 1);
        assertThat(testConformite.getAffichage()).isEqualTo(UPDATED_AFFICHAGE);
        assertThat(testConformite.getLienBonita()).isEqualTo(UPDATED_LIEN_BONITA);
    }

    @Test
    @Transactional
    void putNonExistingConformite() throws Exception {
        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();
        conformite.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConformiteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, conformite.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(conformite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConformite() throws Exception {
        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();
        conformite.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConformiteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(conformite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConformite() throws Exception {
        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();
        conformite.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConformiteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(conformite)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConformiteWithPatch() throws Exception {
        // Initialize the database
        conformiteRepository.saveAndFlush(conformite);

        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();

        // Update the conformite using partial update
        Conformite partialUpdatedConformite = new Conformite();
        partialUpdatedConformite.setId(conformite.getId());

        partialUpdatedConformite.affichage(UPDATED_AFFICHAGE).lienBonita(UPDATED_LIEN_BONITA);

        restConformiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConformite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConformite))
            )
            .andExpect(status().isOk());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
        Conformite testConformite = conformiteList.get(conformiteList.size() - 1);
        assertThat(testConformite.getAffichage()).isEqualTo(UPDATED_AFFICHAGE);
        assertThat(testConformite.getLienBonita()).isEqualTo(UPDATED_LIEN_BONITA);
    }

    @Test
    @Transactional
    void fullUpdateConformiteWithPatch() throws Exception {
        // Initialize the database
        conformiteRepository.saveAndFlush(conformite);

        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();

        // Update the conformite using partial update
        Conformite partialUpdatedConformite = new Conformite();
        partialUpdatedConformite.setId(conformite.getId());

        partialUpdatedConformite.affichage(UPDATED_AFFICHAGE).lienBonita(UPDATED_LIEN_BONITA);

        restConformiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConformite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConformite))
            )
            .andExpect(status().isOk());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
        Conformite testConformite = conformiteList.get(conformiteList.size() - 1);
        assertThat(testConformite.getAffichage()).isEqualTo(UPDATED_AFFICHAGE);
        assertThat(testConformite.getLienBonita()).isEqualTo(UPDATED_LIEN_BONITA);
    }

    @Test
    @Transactional
    void patchNonExistingConformite() throws Exception {
        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();
        conformite.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConformiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, conformite.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(conformite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConformite() throws Exception {
        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();
        conformite.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConformiteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(conformite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConformite() throws Exception {
        int databaseSizeBeforeUpdate = conformiteRepository.findAll().size();
        conformite.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConformiteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(conformite))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Conformite in the database
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConformite() throws Exception {
        // Initialize the database
        conformiteRepository.saveAndFlush(conformite);

        int databaseSizeBeforeDelete = conformiteRepository.findAll().size();

        // Delete the conformite
        restConformiteMockMvc
            .perform(delete(ENTITY_API_URL_ID, conformite.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Conformite> conformiteList = conformiteRepository.findAll();
        assertThat(conformiteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
