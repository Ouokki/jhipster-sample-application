package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.OffreProduit;
import com.mycompany.myapp.repository.OffreProduitRepository;
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
 * Integration tests for the {@link OffreProduitResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class OffreProduitResourceIT {

    private static final Boolean DEFAULT_ACTIVE_PROD = false;
    private static final Boolean UPDATED_ACTIVE_PROD = true;

    private static final Boolean DEFAULT_ACTIVE_NEHOM = false;
    private static final Boolean UPDATED_ACTIVE_NEHOM = true;

    private static final Boolean DEFAULT_ACTIVE_VMOA = false;
    private static final Boolean UPDATED_ACTIVE_VMOA = true;

    private static final Boolean DEFAULT_ACTIVE_DEVTU = false;
    private static final Boolean UPDATED_ACTIVE_DEVTU = true;

    private static final String ENTITY_API_URL = "/api/offre-produits";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OffreProduitRepository offreProduitRepository;

    @Mock
    private OffreProduitRepository offreProduitRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOffreProduitMockMvc;

    private OffreProduit offreProduit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OffreProduit createEntity(EntityManager em) {
        OffreProduit offreProduit = new OffreProduit()
            .activeProd(DEFAULT_ACTIVE_PROD)
            .activeNEHOM(DEFAULT_ACTIVE_NEHOM)
            .activeVMOA(DEFAULT_ACTIVE_VMOA)
            .activeDEVTU(DEFAULT_ACTIVE_DEVTU);
        return offreProduit;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OffreProduit createUpdatedEntity(EntityManager em) {
        OffreProduit offreProduit = new OffreProduit()
            .activeProd(UPDATED_ACTIVE_PROD)
            .activeNEHOM(UPDATED_ACTIVE_NEHOM)
            .activeVMOA(UPDATED_ACTIVE_VMOA)
            .activeDEVTU(UPDATED_ACTIVE_DEVTU);
        return offreProduit;
    }

    @BeforeEach
    public void initTest() {
        offreProduit = createEntity(em);
    }

    @Test
    @Transactional
    void createOffreProduit() throws Exception {
        int databaseSizeBeforeCreate = offreProduitRepository.findAll().size();
        // Create the OffreProduit
        restOffreProduitMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(offreProduit)))
            .andExpect(status().isCreated());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeCreate + 1);
        OffreProduit testOffreProduit = offreProduitList.get(offreProduitList.size() - 1);
        assertThat(testOffreProduit.getActiveProd()).isEqualTo(DEFAULT_ACTIVE_PROD);
        assertThat(testOffreProduit.getActiveNEHOM()).isEqualTo(DEFAULT_ACTIVE_NEHOM);
        assertThat(testOffreProduit.getActiveVMOA()).isEqualTo(DEFAULT_ACTIVE_VMOA);
        assertThat(testOffreProduit.getActiveDEVTU()).isEqualTo(DEFAULT_ACTIVE_DEVTU);
    }

    @Test
    @Transactional
    void createOffreProduitWithExistingId() throws Exception {
        // Create the OffreProduit with an existing ID
        offreProduit.setId(1L);

        int databaseSizeBeforeCreate = offreProduitRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOffreProduitMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(offreProduit)))
            .andExpect(status().isBadRequest());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllOffreProduits() throws Exception {
        // Initialize the database
        offreProduitRepository.saveAndFlush(offreProduit);

        // Get all the offreProduitList
        restOffreProduitMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(offreProduit.getId().intValue())))
            .andExpect(jsonPath("$.[*].activeProd").value(hasItem(DEFAULT_ACTIVE_PROD.booleanValue())))
            .andExpect(jsonPath("$.[*].activeNEHOM").value(hasItem(DEFAULT_ACTIVE_NEHOM.booleanValue())))
            .andExpect(jsonPath("$.[*].activeVMOA").value(hasItem(DEFAULT_ACTIVE_VMOA.booleanValue())))
            .andExpect(jsonPath("$.[*].activeDEVTU").value(hasItem(DEFAULT_ACTIVE_DEVTU.booleanValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllOffreProduitsWithEagerRelationshipsIsEnabled() throws Exception {
        when(offreProduitRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOffreProduitMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(offreProduitRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllOffreProduitsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(offreProduitRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOffreProduitMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(offreProduitRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getOffreProduit() throws Exception {
        // Initialize the database
        offreProduitRepository.saveAndFlush(offreProduit);

        // Get the offreProduit
        restOffreProduitMockMvc
            .perform(get(ENTITY_API_URL_ID, offreProduit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(offreProduit.getId().intValue()))
            .andExpect(jsonPath("$.activeProd").value(DEFAULT_ACTIVE_PROD.booleanValue()))
            .andExpect(jsonPath("$.activeNEHOM").value(DEFAULT_ACTIVE_NEHOM.booleanValue()))
            .andExpect(jsonPath("$.activeVMOA").value(DEFAULT_ACTIVE_VMOA.booleanValue()))
            .andExpect(jsonPath("$.activeDEVTU").value(DEFAULT_ACTIVE_DEVTU.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingOffreProduit() throws Exception {
        // Get the offreProduit
        restOffreProduitMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOffreProduit() throws Exception {
        // Initialize the database
        offreProduitRepository.saveAndFlush(offreProduit);

        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();

        // Update the offreProduit
        OffreProduit updatedOffreProduit = offreProduitRepository.findById(offreProduit.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedOffreProduit are not directly saved in db
        em.detach(updatedOffreProduit);
        updatedOffreProduit
            .activeProd(UPDATED_ACTIVE_PROD)
            .activeNEHOM(UPDATED_ACTIVE_NEHOM)
            .activeVMOA(UPDATED_ACTIVE_VMOA)
            .activeDEVTU(UPDATED_ACTIVE_DEVTU);

        restOffreProduitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOffreProduit.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOffreProduit))
            )
            .andExpect(status().isOk());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
        OffreProduit testOffreProduit = offreProduitList.get(offreProduitList.size() - 1);
        assertThat(testOffreProduit.getActiveProd()).isEqualTo(UPDATED_ACTIVE_PROD);
        assertThat(testOffreProduit.getActiveNEHOM()).isEqualTo(UPDATED_ACTIVE_NEHOM);
        assertThat(testOffreProduit.getActiveVMOA()).isEqualTo(UPDATED_ACTIVE_VMOA);
        assertThat(testOffreProduit.getActiveDEVTU()).isEqualTo(UPDATED_ACTIVE_DEVTU);
    }

    @Test
    @Transactional
    void putNonExistingOffreProduit() throws Exception {
        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();
        offreProduit.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreProduitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, offreProduit.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(offreProduit))
            )
            .andExpect(status().isBadRequest());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOffreProduit() throws Exception {
        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();
        offreProduit.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreProduitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(offreProduit))
            )
            .andExpect(status().isBadRequest());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOffreProduit() throws Exception {
        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();
        offreProduit.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreProduitMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(offreProduit)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOffreProduitWithPatch() throws Exception {
        // Initialize the database
        offreProduitRepository.saveAndFlush(offreProduit);

        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();

        // Update the offreProduit using partial update
        OffreProduit partialUpdatedOffreProduit = new OffreProduit();
        partialUpdatedOffreProduit.setId(offreProduit.getId());

        partialUpdatedOffreProduit.activeNEHOM(UPDATED_ACTIVE_NEHOM).activeVMOA(UPDATED_ACTIVE_VMOA);

        restOffreProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOffreProduit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOffreProduit))
            )
            .andExpect(status().isOk());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
        OffreProduit testOffreProduit = offreProduitList.get(offreProduitList.size() - 1);
        assertThat(testOffreProduit.getActiveProd()).isEqualTo(DEFAULT_ACTIVE_PROD);
        assertThat(testOffreProduit.getActiveNEHOM()).isEqualTo(UPDATED_ACTIVE_NEHOM);
        assertThat(testOffreProduit.getActiveVMOA()).isEqualTo(UPDATED_ACTIVE_VMOA);
        assertThat(testOffreProduit.getActiveDEVTU()).isEqualTo(DEFAULT_ACTIVE_DEVTU);
    }

    @Test
    @Transactional
    void fullUpdateOffreProduitWithPatch() throws Exception {
        // Initialize the database
        offreProduitRepository.saveAndFlush(offreProduit);

        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();

        // Update the offreProduit using partial update
        OffreProduit partialUpdatedOffreProduit = new OffreProduit();
        partialUpdatedOffreProduit.setId(offreProduit.getId());

        partialUpdatedOffreProduit
            .activeProd(UPDATED_ACTIVE_PROD)
            .activeNEHOM(UPDATED_ACTIVE_NEHOM)
            .activeVMOA(UPDATED_ACTIVE_VMOA)
            .activeDEVTU(UPDATED_ACTIVE_DEVTU);

        restOffreProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOffreProduit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOffreProduit))
            )
            .andExpect(status().isOk());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
        OffreProduit testOffreProduit = offreProduitList.get(offreProduitList.size() - 1);
        assertThat(testOffreProduit.getActiveProd()).isEqualTo(UPDATED_ACTIVE_PROD);
        assertThat(testOffreProduit.getActiveNEHOM()).isEqualTo(UPDATED_ACTIVE_NEHOM);
        assertThat(testOffreProduit.getActiveVMOA()).isEqualTo(UPDATED_ACTIVE_VMOA);
        assertThat(testOffreProduit.getActiveDEVTU()).isEqualTo(UPDATED_ACTIVE_DEVTU);
    }

    @Test
    @Transactional
    void patchNonExistingOffreProduit() throws Exception {
        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();
        offreProduit.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOffreProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, offreProduit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(offreProduit))
            )
            .andExpect(status().isBadRequest());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOffreProduit() throws Exception {
        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();
        offreProduit.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(offreProduit))
            )
            .andExpect(status().isBadRequest());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOffreProduit() throws Exception {
        int databaseSizeBeforeUpdate = offreProduitRepository.findAll().size();
        offreProduit.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOffreProduitMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(offreProduit))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the OffreProduit in the database
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOffreProduit() throws Exception {
        // Initialize the database
        offreProduitRepository.saveAndFlush(offreProduit);

        int databaseSizeBeforeDelete = offreProduitRepository.findAll().size();

        // Delete the offreProduit
        restOffreProduitMockMvc
            .perform(delete(ENTITY_API_URL_ID, offreProduit.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OffreProduit> offreProduitList = offreProduitRepository.findAll();
        assertThat(offreProduitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
