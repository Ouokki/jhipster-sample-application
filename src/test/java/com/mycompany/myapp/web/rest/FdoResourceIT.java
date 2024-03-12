package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Fdo;
import com.mycompany.myapp.repository.FdoRepository;
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
 * Integration tests for the {@link FdoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class FdoResourceIT {

    private static final String ENTITY_API_URL = "/api/fdos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FdoRepository fdoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFdoMockMvc;

    private Fdo fdo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fdo createEntity(EntityManager em) {
        Fdo fdo = new Fdo();
        return fdo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fdo createUpdatedEntity(EntityManager em) {
        Fdo fdo = new Fdo();
        return fdo;
    }

    @BeforeEach
    public void initTest() {
        fdo = createEntity(em);
    }

    @Test
    @Transactional
    void createFdo() throws Exception {
        int databaseSizeBeforeCreate = fdoRepository.findAll().size();
        // Create the Fdo
        restFdoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fdo)))
            .andExpect(status().isCreated());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeCreate + 1);
        Fdo testFdo = fdoList.get(fdoList.size() - 1);
    }

    @Test
    @Transactional
    void createFdoWithExistingId() throws Exception {
        // Create the Fdo with an existing ID
        fdo.setId(1L);

        int databaseSizeBeforeCreate = fdoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restFdoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fdo)))
            .andExpect(status().isBadRequest());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllFdos() throws Exception {
        // Initialize the database
        fdoRepository.saveAndFlush(fdo);

        // Get all the fdoList
        restFdoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fdo.getId().intValue())));
    }

    @Test
    @Transactional
    void getFdo() throws Exception {
        // Initialize the database
        fdoRepository.saveAndFlush(fdo);

        // Get the fdo
        restFdoMockMvc
            .perform(get(ENTITY_API_URL_ID, fdo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fdo.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingFdo() throws Exception {
        // Get the fdo
        restFdoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingFdo() throws Exception {
        // Initialize the database
        fdoRepository.saveAndFlush(fdo);

        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();

        // Update the fdo
        Fdo updatedFdo = fdoRepository.findById(fdo.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedFdo are not directly saved in db
        em.detach(updatedFdo);

        restFdoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedFdo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedFdo))
            )
            .andExpect(status().isOk());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
        Fdo testFdo = fdoList.get(fdoList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingFdo() throws Exception {
        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();
        fdo.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFdoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, fdo.getId()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fdo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchFdo() throws Exception {
        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();
        fdo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFdoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(fdo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamFdo() throws Exception {
        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();
        fdo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFdoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(fdo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateFdoWithPatch() throws Exception {
        // Initialize the database
        fdoRepository.saveAndFlush(fdo);

        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();

        // Update the fdo using partial update
        Fdo partialUpdatedFdo = new Fdo();
        partialUpdatedFdo.setId(fdo.getId());

        restFdoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFdo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFdo))
            )
            .andExpect(status().isOk());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
        Fdo testFdo = fdoList.get(fdoList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateFdoWithPatch() throws Exception {
        // Initialize the database
        fdoRepository.saveAndFlush(fdo);

        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();

        // Update the fdo using partial update
        Fdo partialUpdatedFdo = new Fdo();
        partialUpdatedFdo.setId(fdo.getId());

        restFdoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedFdo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedFdo))
            )
            .andExpect(status().isOk());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
        Fdo testFdo = fdoList.get(fdoList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingFdo() throws Exception {
        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();
        fdo.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFdoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, fdo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fdo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchFdo() throws Exception {
        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();
        fdo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFdoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(fdo))
            )
            .andExpect(status().isBadRequest());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamFdo() throws Exception {
        int databaseSizeBeforeUpdate = fdoRepository.findAll().size();
        fdo.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restFdoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(fdo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Fdo in the database
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteFdo() throws Exception {
        // Initialize the database
        fdoRepository.saveAndFlush(fdo);

        int databaseSizeBeforeDelete = fdoRepository.findAll().size();

        // Delete the fdo
        restFdoMockMvc.perform(delete(ENTITY_API_URL_ID, fdo.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fdo> fdoList = fdoRepository.findAll();
        assertThat(fdoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
