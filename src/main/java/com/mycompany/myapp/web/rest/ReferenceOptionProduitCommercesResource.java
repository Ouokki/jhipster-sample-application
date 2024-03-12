package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ReferenceOptionProduitCommerces;
import com.mycompany.myapp.repository.ReferenceOptionProduitCommercesRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.ReferenceOptionProduitCommerces}.
 */
@RestController
@RequestMapping("/api/reference-option-produit-commerces")
@Transactional
public class ReferenceOptionProduitCommercesResource {

    private final Logger log = LoggerFactory.getLogger(ReferenceOptionProduitCommercesResource.class);

    private static final String ENTITY_NAME = "referenceOptionProduitCommerces";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReferenceOptionProduitCommercesRepository referenceOptionProduitCommercesRepository;

    public ReferenceOptionProduitCommercesResource(ReferenceOptionProduitCommercesRepository referenceOptionProduitCommercesRepository) {
        this.referenceOptionProduitCommercesRepository = referenceOptionProduitCommercesRepository;
    }

    /**
     * {@code POST  /reference-option-produit-commerces} : Create a new referenceOptionProduitCommerces.
     *
     * @param referenceOptionProduitCommerces the referenceOptionProduitCommerces to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new referenceOptionProduitCommerces, or with status {@code 400 (Bad Request)} if the referenceOptionProduitCommerces has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ReferenceOptionProduitCommerces> createReferenceOptionProduitCommerces(
        @RequestBody ReferenceOptionProduitCommerces referenceOptionProduitCommerces
    ) throws URISyntaxException {
        log.debug("REST request to save ReferenceOptionProduitCommerces : {}", referenceOptionProduitCommerces);
        if (referenceOptionProduitCommerces.getId() != null) {
            throw new BadRequestAlertException("A new referenceOptionProduitCommerces cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReferenceOptionProduitCommerces result = referenceOptionProduitCommercesRepository.save(referenceOptionProduitCommerces);
        return ResponseEntity
            .created(new URI("/api/reference-option-produit-commerces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reference-option-produit-commerces/:id} : Updates an existing referenceOptionProduitCommerces.
     *
     * @param id the id of the referenceOptionProduitCommerces to save.
     * @param referenceOptionProduitCommerces the referenceOptionProduitCommerces to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated referenceOptionProduitCommerces,
     * or with status {@code 400 (Bad Request)} if the referenceOptionProduitCommerces is not valid,
     * or with status {@code 500 (Internal Server Error)} if the referenceOptionProduitCommerces couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ReferenceOptionProduitCommerces> updateReferenceOptionProduitCommerces(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReferenceOptionProduitCommerces referenceOptionProduitCommerces
    ) throws URISyntaxException {
        log.debug("REST request to update ReferenceOptionProduitCommerces : {}, {}", id, referenceOptionProduitCommerces);
        if (referenceOptionProduitCommerces.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, referenceOptionProduitCommerces.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!referenceOptionProduitCommercesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReferenceOptionProduitCommerces result = referenceOptionProduitCommercesRepository.save(referenceOptionProduitCommerces);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, referenceOptionProduitCommerces.getId().toString())
            )
            .body(result);
    }

    /**
     * {@code PATCH  /reference-option-produit-commerces/:id} : Partial updates given fields of an existing referenceOptionProduitCommerces, field will ignore if it is null
     *
     * @param id the id of the referenceOptionProduitCommerces to save.
     * @param referenceOptionProduitCommerces the referenceOptionProduitCommerces to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated referenceOptionProduitCommerces,
     * or with status {@code 400 (Bad Request)} if the referenceOptionProduitCommerces is not valid,
     * or with status {@code 404 (Not Found)} if the referenceOptionProduitCommerces is not found,
     * or with status {@code 500 (Internal Server Error)} if the referenceOptionProduitCommerces couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ReferenceOptionProduitCommerces> partialUpdateReferenceOptionProduitCommerces(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReferenceOptionProduitCommerces referenceOptionProduitCommerces
    ) throws URISyntaxException {
        log.debug("REST request to partial update ReferenceOptionProduitCommerces partially : {}, {}", id, referenceOptionProduitCommerces);
        if (referenceOptionProduitCommerces.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, referenceOptionProduitCommerces.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!referenceOptionProduitCommercesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReferenceOptionProduitCommerces> result = referenceOptionProduitCommercesRepository
            .findById(referenceOptionProduitCommerces.getId())
            .map(existingReferenceOptionProduitCommerces -> {
                if (referenceOptionProduitCommerces.getCodeOptionProduit() != null) {
                    existingReferenceOptionProduitCommerces.setCodeOptionProduit(referenceOptionProduitCommerces.getCodeOptionProduit());
                }
                if (referenceOptionProduitCommerces.getLibelleOptionProduit() != null) {
                    existingReferenceOptionProduitCommerces.setLibelleOptionProduit(
                        referenceOptionProduitCommerces.getLibelleOptionProduit()
                    );
                }

                return existingReferenceOptionProduitCommerces;
            })
            .map(referenceOptionProduitCommercesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, referenceOptionProduitCommerces.getId().toString())
        );
    }

    /**
     * {@code GET  /reference-option-produit-commerces} : get all the referenceOptionProduitCommerces.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of referenceOptionProduitCommerces in body.
     */
    @GetMapping("")
    public List<ReferenceOptionProduitCommerces> getAllReferenceOptionProduitCommerces() {
        log.debug("REST request to get all ReferenceOptionProduitCommerces");
        return referenceOptionProduitCommercesRepository.findAll();
    }

    /**
     * {@code GET  /reference-option-produit-commerces/:id} : get the "id" referenceOptionProduitCommerces.
     *
     * @param id the id of the referenceOptionProduitCommerces to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the referenceOptionProduitCommerces, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReferenceOptionProduitCommerces> getReferenceOptionProduitCommerces(@PathVariable("id") Long id) {
        log.debug("REST request to get ReferenceOptionProduitCommerces : {}", id);
        Optional<ReferenceOptionProduitCommerces> referenceOptionProduitCommerces = referenceOptionProduitCommercesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(referenceOptionProduitCommerces);
    }

    /**
     * {@code DELETE  /reference-option-produit-commerces/:id} : delete the "id" referenceOptionProduitCommerces.
     *
     * @param id the id of the referenceOptionProduitCommerces to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferenceOptionProduitCommerces(@PathVariable("id") Long id) {
        log.debug("REST request to delete ReferenceOptionProduitCommerces : {}", id);
        referenceOptionProduitCommercesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
