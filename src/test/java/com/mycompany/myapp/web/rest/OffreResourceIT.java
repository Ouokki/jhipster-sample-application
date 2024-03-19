package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Offre;
import com.mycompany.myapp.repository.OffreRepository;
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
 * Integration tests for the {@link OffreResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OffreResourceIT {

    private static final String DEFAULT_CODE_OFFRE = "AAAAAAAAAA";
    private static final String UPDATED_CODE_OFFRE = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE_OFFRE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE_OFFRE = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_ECHANGE_AVEM = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_ECHANGE_AVEM = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE_ECHANGE_CAPS = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE_ECHANGE_CAPS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/offres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOffreMockMvc;

    private Offre offre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Offre createEntity(EntityManager em) {
        Offre offre = new Offre()
            .codeOffre(DEFAULT_CODE_OFFRE)
            .libelleOffre(DEFAULT_LIBELLE_OFFRE)
            .referenceEchangeAVEM(DEFAULT_REFERENCE_ECHANGE_AVEM)
            .referenceEchangeCAPS(DEFAULT_REFERENCE_ECHANGE_CAPS);
        return offre;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Offre createUpdatedEntity(EntityManager em) {
        Offre offre = new Offre()
            .codeOffre(UPDATED_CODE_OFFRE)
            .libelleOffre(UPDATED_LIBELLE_OFFRE)
            .referenceEchangeAVEM(UPDATED_REFERENCE_ECHANGE_AVEM)
            .referenceEchangeCAPS(UPDATED_REFERENCE_ECHANGE_CAPS);
        return offre;
    }

    @BeforeEach
    public void initTest() {
        offre = createEntity(em);
    }

    @Test
    @Transactional
    void createOffre() throws Exception {
        int databaseSizeBeforeCreate = offreRepository.findAll().size();
        // Create the Offre
        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isCreated());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeCreate + 1);
        Offre testOffre = offreList.get(offreList.size() - 1);
        assertThat(testOffre.getCodeOffre()).isEqualTo(DEFAULT_CODE_OFFRE);
        assertThat(testOffre.getLibelleOffre()).isEqualTo(DEFAULT_LIBELLE_OFFRE);
        assertThat(testOffre.getReferenceEchangeAVEM()).isEqualTo(DEFAULT_REFERENCE_ECHANGE_AVEM);
        assertThat(testOffre.getReferenceEchangeCAPS()).isEqualTo(DEFAULT_REFERENCE_ECHANGE_CAPS);
    }

    @Test
    @Transactional
    void createOffreWithExistingId() throws Exception {
        // Create the Offre with an existing ID
        offre.setId(1L);

        int databaseSizeBeforeCreate = offreRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOffreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOffres() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        // Get all the offreList
        restOffreMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offre.getId().intValue())))
            .andExpect(jsonPath("$.[*].codeOffre").value(hasItem(DEFAULT_CODE_OFFRE)))
            .andExpect(jsonPath("$.[*].libelleOffre").value(hasItem(DEFAULT_LIBELLE_OFFRE)))
            .andExpect(jsonPath("$.[*].referenceEchangeAVEM").value(hasItem(DEFAULT_REFERENCE_ECHANGE_AVEM)))
            .andExpect(jsonPath("$.[*].referenceEchangeCAPS").value(hasItem(DEFAULT_REFERENCE_ECHANGE_CAPS)));
    }

    @Test
    @Transactional
    void getOffre() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        // Get the offre
        restOffreMockMvc
            .perform(get(ENTITY_API_URL_ID, offre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(offre.getId().intValue()))
            .andExpect(jsonPath("$.codeOffre").value(DEFAULT_CODE_OFFRE))
            .andExpect(jsonPath("$.libelleOffre").value(DEFAULT_LIBELLE_OFFRE))
            .andExpect(jsonPath("$.referenceEchangeAVEM").value(DEFAULT_REFERENCE_ECHANGE_AVEM))
            .andExpect(jsonPath("$.referenceEchangeCAPS").value(DEFAULT_REFERENCE_ECHANGE_CAPS));
    }

    @Test
    @Transactional
    void getNonExistingOffre() throws Exception {
        // Get the offre
        restOffreMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOffre() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        int databaseSizeBeforeUpdate = offreRepository.findAll().size();

        // Update the offre
        Offre updatedOffre = offreRepository.findById(offre.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOffre are not directly saved in db
        em.detach(updatedOffre);
        updatedOffre
            .codeOffre(UPDATED_CODE_OFFRE)
            .libelleOffre(UPDATED_LIBELLE_OFFRE)
            .referenceEchangeAVEM(UPDATED_REFERENCE_ECHANGE_AVEM)
            .referenceEchangeCAPS(UPDATED_REFERENCE_ECHANGE_CAPS);

        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOffre.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOffre))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
        Offre testOffre = offreList.get(offreList.size() - 1);
        assertThat(testOffre.getCodeOffre()).isEqualTo(UPDATED_CODE_OFFRE);
        assertThat(testOffre.getLibelleOffre()).isEqualTo(UPDATED_LIBELLE_OFFRE);
        assertThat(testOffre.getReferenceEchangeAVEM()).isEqualTo(UPDATED_REFERENCE_ECHANGE_AVEM);
        assertThat(testOffre.getReferenceEchangeCAPS()).isEqualTo(UPDATED_REFERENCE_ECHANGE_CAPS);
    }

    @Test
    @Transactional
    void putNonExistingOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();
        offre.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, offre.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(offre))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();
        offre.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(offre))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();
        offre.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOffreWithPatch() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        int databaseSizeBeforeUpdate = offreRepository.findAll().size();

        // Update the offre using partial update
        Offre partialUpdatedOffre = new Offre();
        partialUpdatedOffre.setId(offre.getId());

        partialUpdatedOffre
            .codeOffre(UPDATED_CODE_OFFRE)
            .referenceEchangeAVEM(UPDATED_REFERENCE_ECHANGE_AVEM)
            .referenceEchangeCAPS(UPDATED_REFERENCE_ECHANGE_CAPS);

        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOffre.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOffre))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
        Offre testOffre = offreList.get(offreList.size() - 1);
        assertThat(testOffre.getCodeOffre()).isEqualTo(UPDATED_CODE_OFFRE);
        assertThat(testOffre.getLibelleOffre()).isEqualTo(DEFAULT_LIBELLE_OFFRE);
        assertThat(testOffre.getReferenceEchangeAVEM()).isEqualTo(UPDATED_REFERENCE_ECHANGE_AVEM);
        assertThat(testOffre.getReferenceEchangeCAPS()).isEqualTo(UPDATED_REFERENCE_ECHANGE_CAPS);
    }

    @Test
    @Transactional
    void fullUpdateOffreWithPatch() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        int databaseSizeBeforeUpdate = offreRepository.findAll().size();

        // Update the offre using partial update
        Offre partialUpdatedOffre = new Offre();
        partialUpdatedOffre.setId(offre.getId());

        partialUpdatedOffre
            .codeOffre(UPDATED_CODE_OFFRE)
            .libelleOffre(UPDATED_LIBELLE_OFFRE)
            .referenceEchangeAVEM(UPDATED_REFERENCE_ECHANGE_AVEM)
            .referenceEchangeCAPS(UPDATED_REFERENCE_ECHANGE_CAPS);

        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOffre.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOffre))
            )
            .andExpect(status().isOk());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
        Offre testOffre = offreList.get(offreList.size() - 1);
        assertThat(testOffre.getCodeOffre()).isEqualTo(UPDATED_CODE_OFFRE);
        assertThat(testOffre.getLibelleOffre()).isEqualTo(UPDATED_LIBELLE_OFFRE);
        assertThat(testOffre.getReferenceEchangeAVEM()).isEqualTo(UPDATED_REFERENCE_ECHANGE_AVEM);
        assertThat(testOffre.getReferenceEchangeCAPS()).isEqualTo(UPDATED_REFERENCE_ECHANGE_CAPS);
    }

    @Test
    @Transactional
    void patchNonExistingOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();
        offre.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, offre.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(offre))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();
        offre.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(offre))
            )
            .andExpect(status().isBadRequest());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOffre() throws Exception {
        int databaseSizeBeforeUpdate = offreRepository.findAll().size();
        offre.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(offre)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Offre in the database
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOffre() throws Exception {
        // Initialize the database
        offreRepository.saveAndFlush(offre);

        int databaseSizeBeforeDelete = offreRepository.findAll().size();

        // Delete the offre
        restOffreMockMvc
            .perform(delete(ENTITY_API_URL_ID, offre.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Offre> offreList = offreRepository.findAll();
        assertThat(offreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
