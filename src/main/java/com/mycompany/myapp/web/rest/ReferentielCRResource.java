package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ReferentielCR;
import com.mycompany.myapp.repository.ReferentielCRRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ReferentielCR}.
 */
@RestController
@RequestMapping("/api/referentiel-crs")
@Transactional
public class ReferentielCRResource {

    private final Logger log = LoggerFactory.getLogger(ReferentielCRResource.class);

    private static final String ENTITY_NAME = "referentielCR";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReferentielCRRepository referentielCRRepository;

    public ReferentielCRResource(ReferentielCRRepository referentielCRRepository) {
        this.referentielCRRepository = referentielCRRepository;
    }

    /**
     * {@code POST  /referentiel-crs} : Create a new referentielCR.
     *
     * @param referentielCR the referentielCR to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new referentielCR, or with status {@code 400 (Bad Request)} if the referentielCR has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ReferentielCR> createReferentielCR(@RequestBody ReferentielCR referentielCR) throws URISyntaxException {
        log.debug("REST request to save ReferentielCR : {}", referentielCR);
        if (referentielCR.getId() != null) {
            throw new BadRequestAlertException("A new referentielCR cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReferentielCR result = referentielCRRepository.save(referentielCR);
        return ResponseEntity
            .created(new URI("/api/referentiel-crs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /referentiel-crs/:id} : Updates an existing referentielCR.
     *
     * @param id the id of the referentielCR to save.
     * @param referentielCR the referentielCR to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated referentielCR,
     * or with status {@code 400 (Bad Request)} if the referentielCR is not valid,
     * or with status {@code 500 (Internal Server Error)} if the referentielCR couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ReferentielCR> updateReferentielCR(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReferentielCR referentielCR
    ) throws URISyntaxException {
        log.debug("REST request to update ReferentielCR : {}, {}", id, referentielCR);
        if (referentielCR.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, referentielCR.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!referentielCRRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReferentielCR result = referentielCRRepository.save(referentielCR);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, referentielCR.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /referentiel-crs/:id} : Partial updates given fields of an existing referentielCR, field will ignore if it is null
     *
     * @param id the id of the referentielCR to save.
     * @param referentielCR the referentielCR to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated referentielCR,
     * or with status {@code 400 (Bad Request)} if the referentielCR is not valid,
     * or with status {@code 404 (Not Found)} if the referentielCR is not found,
     * or with status {@code 500 (Internal Server Error)} if the referentielCR couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ReferentielCR> partialUpdateReferentielCR(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReferentielCR referentielCR
    ) throws URISyntaxException {
        log.debug("REST request to partial update ReferentielCR partially : {}, {}", id, referentielCR);
        if (referentielCR.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, referentielCR.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!referentielCRRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReferentielCR> result = referentielCRRepository
            .findById(referentielCR.getId())
            .map(existingReferentielCR -> {
                if (referentielCR.getNomCR() != null) {
                    existingReferentielCR.setNomCR(referentielCR.getNomCR());
                }
                if (referentielCR.getNumeroCR() != null) {
                    existingReferentielCR.setNumeroCR(referentielCR.getNumeroCR());
                }

                return existingReferentielCR;
            })
            .map(referentielCRRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, referentielCR.getId().toString())
        );
    }

    /**
     * {@code GET  /referentiel-crs} : get all the referentielCRS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of referentielCRS in body.
     */
    @GetMapping("")
    public List<ReferentielCR> getAllReferentielCRS() {
        log.debug("REST request to get all ReferentielCRS");
        return referentielCRRepository.findAll();
    }

    /**
     * {@code GET  /referentiel-crs/:id} : get the "id" referentielCR.
     *
     * @param id the id of the referentielCR to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the referentielCR, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReferentielCR> getReferentielCR(@PathVariable("id") Long id) {
        log.debug("REST request to get ReferentielCR : {}", id);
        Optional<ReferentielCR> referentielCR = referentielCRRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(referentielCR);
    }

    /**
     * {@code DELETE  /referentiel-crs/:id} : delete the "id" referentielCR.
     *
     * @param id the id of the referentielCR to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferentielCR(@PathVariable("id") Long id) {
        log.debug("REST request to delete ReferentielCR : {}", id);
        referentielCRRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
