package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Tpe;
import com.mycompany.myapp.repository.TpeRepository;
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
 * Integration tests for the {@link TpeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TpeResourceIT {

    private static final String DEFAULT_IMAGE_TPE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_TPE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTIF = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTIF = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tpes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TpeRepository tpeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTpeMockMvc;

    private Tpe tpe;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tpe createEntity(EntityManager em) {
        Tpe tpe = new Tpe().imageTpe(DEFAULT_IMAGE_TPE).descriptif(DEFAULT_DESCRIPTIF);
        return tpe;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tpe createUpdatedEntity(EntityManager em) {
        Tpe tpe = new Tpe().imageTpe(UPDATED_IMAGE_TPE).descriptif(UPDATED_DESCRIPTIF);
        return tpe;
    }

    @BeforeEach
    public void initTest() {
        tpe = createEntity(em);
    }

    @Test
    @Transactional
    void createTpe() throws Exception {
        int databaseSizeBeforeCreate = tpeRepository.findAll().size();
        // Create the Tpe
        restTpeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tpe)))
            .andExpect(status().isCreated());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeCreate + 1);
        Tpe testTpe = tpeList.get(tpeList.size() - 1);
        assertThat(testTpe.getImageTpe()).isEqualTo(DEFAULT_IMAGE_TPE);
        assertThat(testTpe.getDescriptif()).isEqualTo(DEFAULT_DESCRIPTIF);
    }

    @Test
    @Transactional
    void createTpeWithExistingId() throws Exception {
        // Create the Tpe with an existing ID
        tpe.setId(1L);

        int databaseSizeBeforeCreate = tpeRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTpeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tpe)))
            .andExpect(status().isBadRequest());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTpes() throws Exception {
        // Initialize the database
        tpeRepository.saveAndFlush(tpe);

        // Get all the tpeList
        restTpeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tpe.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageTpe").value(hasItem(DEFAULT_IMAGE_TPE)))
            .andExpect(jsonPath("$.[*].descriptif").value(hasItem(DEFAULT_DESCRIPTIF)));
    }

    @Test
    @Transactional
    void getTpe() throws Exception {
        // Initialize the database
        tpeRepository.saveAndFlush(tpe);

        // Get the tpe
        restTpeMockMvc
            .perform(get(ENTITY_API_URL_ID, tpe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tpe.getId().intValue()))
            .andExpect(jsonPath("$.imageTpe").value(DEFAULT_IMAGE_TPE))
            .andExpect(jsonPath("$.descriptif").value(DEFAULT_DESCRIPTIF));
    }

    @Test
    @Transactional
    void getNonExistingTpe() throws Exception {
        // Get the tpe
        restTpeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTpe() throws Exception {
        // Initialize the database
        tpeRepository.saveAndFlush(tpe);

        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();

        // Update the tpe
        Tpe updatedTpe = tpeRepository.findById(tpe.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTpe are not directly saved in db
        em.detach(updatedTpe);
        updatedTpe.imageTpe(UPDATED_IMAGE_TPE).descriptif(UPDATED_DESCRIPTIF);

        restTpeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTpe.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTpe))
            )
            .andExpect(status().isOk());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
        Tpe testTpe = tpeList.get(tpeList.size() - 1);
        assertThat(testTpe.getImageTpe()).isEqualTo(UPDATED_IMAGE_TPE);
        assertThat(testTpe.getDescriptif()).isEqualTo(UPDATED_DESCRIPTIF);
    }

    @Test
    @Transactional
    void putNonExistingTpe() throws Exception {
        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();
        tpe.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTpeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tpe.getId()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tpe))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTpe() throws Exception {
        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();
        tpe.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTpeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tpe))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTpe() throws Exception {
        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();
        tpe.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTpeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tpe)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTpeWithPatch() throws Exception {
        // Initialize the database
        tpeRepository.saveAndFlush(tpe);

        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();

        // Update the tpe using partial update
        Tpe partialUpdatedTpe = new Tpe();
        partialUpdatedTpe.setId(tpe.getId());

        restTpeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTpe.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTpe))
            )
            .andExpect(status().isOk());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
        Tpe testTpe = tpeList.get(tpeList.size() - 1);
        assertThat(testTpe.getImageTpe()).isEqualTo(DEFAULT_IMAGE_TPE);
        assertThat(testTpe.getDescriptif()).isEqualTo(DEFAULT_DESCRIPTIF);
    }

    @Test
    @Transactional
    void fullUpdateTpeWithPatch() throws Exception {
        // Initialize the database
        tpeRepository.saveAndFlush(tpe);

        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();

        // Update the tpe using partial update
        Tpe partialUpdatedTpe = new Tpe();
        partialUpdatedTpe.setId(tpe.getId());

        partialUpdatedTpe.imageTpe(UPDATED_IMAGE_TPE).descriptif(UPDATED_DESCRIPTIF);

        restTpeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTpe.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTpe))
            )
            .andExpect(status().isOk());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
        Tpe testTpe = tpeList.get(tpeList.size() - 1);
        assertThat(testTpe.getImageTpe()).isEqualTo(UPDATED_IMAGE_TPE);
        assertThat(testTpe.getDescriptif()).isEqualTo(UPDATED_DESCRIPTIF);
    }

    @Test
    @Transactional
    void patchNonExistingTpe() throws Exception {
        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();
        tpe.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTpeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tpe.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tpe))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTpe() throws Exception {
        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();
        tpe.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTpeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tpe))
            )
            .andExpect(status().isBadRequest());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTpe() throws Exception {
        int databaseSizeBeforeUpdate = tpeRepository.findAll().size();
        tpe.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTpeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(tpe)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Tpe in the database
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTpe() throws Exception {
        // Initialize the database
        tpeRepository.saveAndFlush(tpe);

        int databaseSizeBeforeDelete = tpeRepository.findAll().size();

        // Delete the tpe
        restTpeMockMvc.perform(delete(ENTITY_API_URL_ID, tpe.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tpe> tpeList = tpeRepository.findAll();
        assertThat(tpeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
