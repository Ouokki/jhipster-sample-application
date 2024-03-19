package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OffreProduit;
import com.mycompany.myapp.repository.OffreProduitRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.OffreProduit}.
 */
@RestController
@RequestMapping("/api/offre-produits")
@Transactional
public class OffreProduitResource {

    private final Logger log = LoggerFactory.getLogger(OffreProduitResource.class);

    private static final String ENTITY_NAME = "offreProduit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OffreProduitRepository offreProduitRepository;

    public OffreProduitResource(OffreProduitRepository offreProduitRepository) {
        this.offreProduitRepository = offreProduitRepository;
    }

    /**
     * {@code POST  /offre-produits} : Create a new offreProduit.
     *
     * @param offreProduit the offreProduit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new offreProduit, or with status {@code 400 (Bad Request)} if the offreProduit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OffreProduit> createOffreProduit(@RequestBody OffreProduit offreProduit) throws URISyntaxException {
        log.debug("REST request to save OffreProduit : {}", offreProduit);
        if (offreProduit.getId() != null) {
            throw new BadRequestAlertException("A new offreProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OffreProduit result = offreProduitRepository.save(offreProduit);
        return ResponseEntity
            .created(new URI("/api/offre-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /offre-produits/:id} : Updates an existing offreProduit.
     *
     * @param id the id of the offreProduit to save.
     * @param offreProduit the offreProduit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated offreProduit,
     * or with status {@code 400 (Bad Request)} if the offreProduit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the offreProduit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OffreProduit> updateOffreProduit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OffreProduit offreProduit
    ) throws URISyntaxException {
        log.debug("REST request to update OffreProduit : {}, {}", id, offreProduit);
        if (offreProduit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, offreProduit.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!offreProduitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OffreProduit result = offreProduitRepository.save(offreProduit);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, offreProduit.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /offre-produits/:id} : Partial updates given fields of an existing offreProduit, field will ignore if it is null
     *
     * @param id the id of the offreProduit to save.
     * @param offreProduit the offreProduit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated offreProduit,
     * or with status {@code 400 (Bad Request)} if the offreProduit is not valid,
     * or with status {@code 404 (Not Found)} if the offreProduit is not found,
     * or with status {@code 500 (Internal Server Error)} if the offreProduit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OffreProduit> partialUpdateOffreProduit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OffreProduit offreProduit
    ) throws URISyntaxException {
        log.debug("REST request to partial update OffreProduit partially : {}, {}", id, offreProduit);
        if (offreProduit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, offreProduit.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!offreProduitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OffreProduit> result = offreProduitRepository
            .findById(offreProduit.getId())
            .map(existingOffreProduit -> {
                if (offreProduit.getActiveProd() != null) {
                    existingOffreProduit.setActiveProd(offreProduit.getActiveProd());
                }
                if (offreProduit.getActiveNEHOM() != null) {
                    existingOffreProduit.setActiveNEHOM(offreProduit.getActiveNEHOM());
                }
                if (offreProduit.getActiveVMOA() != null) {
                    existingOffreProduit.setActiveVMOA(offreProduit.getActiveVMOA());
                }
                if (offreProduit.getActiveDEVTU() != null) {
                    existingOffreProduit.setActiveDEVTU(offreProduit.getActiveDEVTU());
                }

                return existingOffreProduit;
            })
            .map(offreProduitRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, offreProduit.getId().toString())
        );
    }

    /**
     * {@code GET  /offre-produits} : get all the offreProduits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of offreProduits in body.
     */
    @GetMapping("")
    public List<OffreProduit> getAllOffreProduits() {
        log.debug("REST request to get all OffreProduits");
        return offreProduitRepository.findAll();
    }

    /**
     * {@code GET  /offre-produits/:id} : get the "id" offreProduit.
     *
     * @param id the id of the offreProduit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the offreProduit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OffreProduit> getOffreProduit(@PathVariable("id") Long id) {
        log.debug("REST request to get OffreProduit : {}", id);
        Optional<OffreProduit> offreProduit = offreProduitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(offreProduit);
    }

    /**
     * {@code DELETE  /offre-produits/:id} : delete the "id" offreProduit.
     *
     * @param id the id of the offreProduit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffreProduit(@PathVariable("id") Long id) {
        log.debug("REST request to delete OffreProduit : {}", id);
        offreProduitRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
