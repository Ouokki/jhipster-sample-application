package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.TarifReferenceOption;
import com.mycompany.myapp.repository.TarifReferenceOptionRepository;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TarifReferenceOptionResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class TarifReferenceOptionResourceIT {

    private static final String DEFAULT_TRIGRAMME = "AAAAAAAAAA";
    private static final String UPDATED_TRIGRAMME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/tarif-reference-options";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TarifReferenceOptionRepository tarifReferenceOptionRepository;

    @Mock
    private TarifReferenceOptionRepository tarifReferenceOptionRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTarifReferenceOptionMockMvc;

    private TarifReferenceOption tarifReferenceOption;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TarifReferenceOption createEntity(EntityManager em) {
        TarifReferenceOption tarifReferenceOption = new TarifReferenceOption().trigramme(DEFAULT_TRIGRAMME);
        return tarifReferenceOption;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TarifReferenceOption createUpdatedEntity(EntityManager em) {
        TarifReferenceOption tarifReferenceOption = new TarifReferenceOption().trigramme(UPDATED_TRIGRAMME);
        return tarifReferenceOption;
    }

    @BeforeEach
    public void initTest() {
        tarifReferenceOption = createEntity(em);
    }

    @Test
    @Transactional
    void createTarifReferenceOption() throws Exception {
        int databaseSizeBeforeCreate = tarifReferenceOptionRepository.findAll().size();
        // Create the TarifReferenceOption
        restTarifReferenceOptionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isCreated());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeCreate + 1);
        TarifReferenceOption testTarifReferenceOption = tarifReferenceOptionList.get(tarifReferenceOptionList.size() - 1);
        assertThat(testTarifReferenceOption.getTrigramme()).isEqualTo(DEFAULT_TRIGRAMME);
    }

    @Test
    @Transactional
    void createTarifReferenceOptionWithExistingId() throws Exception {
        // Create the TarifReferenceOption with an existing ID
        tarifReferenceOption.setId(1L);

        int databaseSizeBeforeCreate = tarifReferenceOptionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTarifReferenceOptionMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTarifReferenceOptions() throws Exception {
        // Initialize the database
        tarifReferenceOptionRepository.saveAndFlush(tarifReferenceOption);

        // Get all the tarifReferenceOptionList
        restTarifReferenceOptionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarifReferenceOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].trigramme").value(hasItem(DEFAULT_TRIGRAMME)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTarifReferenceOptionsWithEagerRelationshipsIsEnabled() throws Exception {
        when(tarifReferenceOptionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTarifReferenceOptionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(tarifReferenceOptionRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTarifReferenceOptionsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(tarifReferenceOptionRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTarifReferenceOptionMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(tarifReferenceOptionRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getTarifReferenceOption() throws Exception {
        // Initialize the database
        tarifReferenceOptionRepository.saveAndFlush(tarifReferenceOption);

        // Get the tarifReferenceOption
        restTarifReferenceOptionMockMvc
            .perform(get(ENTITY_API_URL_ID, tarifReferenceOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tarifReferenceOption.getId().intValue()))
            .andExpect(jsonPath("$.trigramme").value(DEFAULT_TRIGRAMME));
    }

    @Test
    @Transactional
    void getNonExistingTarifReferenceOption() throws Exception {
        // Get the tarifReferenceOption
        restTarifReferenceOptionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTarifReferenceOption() throws Exception {
        // Initialize the database
        tarifReferenceOptionRepository.saveAndFlush(tarifReferenceOption);

        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();

        // Update the tarifReferenceOption
        TarifReferenceOption updatedTarifReferenceOption = tarifReferenceOptionRepository
            .findById(tarifReferenceOption.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedTarifReferenceOption are not directly saved in db
        em.detach(updatedTarifReferenceOption);
        updatedTarifReferenceOption.trigramme(UPDATED_TRIGRAMME);

        restTarifReferenceOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTarifReferenceOption.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTarifReferenceOption))
            )
            .andExpect(status().isOk());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
        TarifReferenceOption testTarifReferenceOption = tarifReferenceOptionList.get(tarifReferenceOptionList.size() - 1);
        assertThat(testTarifReferenceOption.getTrigramme()).isEqualTo(UPDATED_TRIGRAMME);
    }

    @Test
    @Transactional
    void putNonExistingTarifReferenceOption() throws Exception {
        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();
        tarifReferenceOption.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifReferenceOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, tarifReferenceOption.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTarifReferenceOption() throws Exception {
        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();
        tarifReferenceOption.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifReferenceOptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTarifReferenceOption() throws Exception {
        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();
        tarifReferenceOption.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifReferenceOptionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTarifReferenceOptionWithPatch() throws Exception {
        // Initialize the database
        tarifReferenceOptionRepository.saveAndFlush(tarifReferenceOption);

        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();

        // Update the tarifReferenceOption using partial update
        TarifReferenceOption partialUpdatedTarifReferenceOption = new TarifReferenceOption();
        partialUpdatedTarifReferenceOption.setId(tarifReferenceOption.getId());

        restTarifReferenceOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarifReferenceOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarifReferenceOption))
            )
            .andExpect(status().isOk());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
        TarifReferenceOption testTarifReferenceOption = tarifReferenceOptionList.get(tarifReferenceOptionList.size() - 1);
        assertThat(testTarifReferenceOption.getTrigramme()).isEqualTo(DEFAULT_TRIGRAMME);
    }

    @Test
    @Transactional
    void fullUpdateTarifReferenceOptionWithPatch() throws Exception {
        // Initialize the database
        tarifReferenceOptionRepository.saveAndFlush(tarifReferenceOption);

        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();

        // Update the tarifReferenceOption using partial update
        TarifReferenceOption partialUpdatedTarifReferenceOption = new TarifReferenceOption();
        partialUpdatedTarifReferenceOption.setId(tarifReferenceOption.getId());

        partialUpdatedTarifReferenceOption.trigramme(UPDATED_TRIGRAMME);

        restTarifReferenceOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTarifReferenceOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTarifReferenceOption))
            )
            .andExpect(status().isOk());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
        TarifReferenceOption testTarifReferenceOption = tarifReferenceOptionList.get(tarifReferenceOptionList.size() - 1);
        assertThat(testTarifReferenceOption.getTrigramme()).isEqualTo(UPDATED_TRIGRAMME);
    }

    @Test
    @Transactional
    void patchNonExistingTarifReferenceOption() throws Exception {
        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();
        tarifReferenceOption.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTarifReferenceOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, tarifReferenceOption.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTarifReferenceOption() throws Exception {
        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();
        tarifReferenceOption.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifReferenceOptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isBadRequest());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTarifReferenceOption() throws Exception {
        int databaseSizeBeforeUpdate = tarifReferenceOptionRepository.findAll().size();
        tarifReferenceOption.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTarifReferenceOptionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(tarifReferenceOption))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the TarifReferenceOption in the database
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTarifReferenceOption() throws Exception {
        // Initialize the database
        tarifReferenceOptionRepository.saveAndFlush(tarifReferenceOption);

        int databaseSizeBeforeDelete = tarifReferenceOptionRepository.findAll().size();

        // Delete the tarifReferenceOption
        restTarifReferenceOptionMockMvc
            .perform(delete(ENTITY_API_URL_ID, tarifReferenceOption.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TarifReferenceOption> tarifReferenceOptionList = tarifReferenceOptionRepository.findAll();
        assertThat(tarifReferenceOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
