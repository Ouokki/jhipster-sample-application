package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.HistModifDemande;
import com.mycompany.myapp.repository.HistModifDemandeRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.HistModifDemande}.
 */
@RestController
@RequestMapping("/api/hist-modif-demandes")
@Transactional
public class HistModifDemandeResource {

    private final Logger log = LoggerFactory.getLogger(HistModifDemandeResource.class);

    private static final String ENTITY_NAME = "histModifDemande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistModifDemandeRepository histModifDemandeRepository;

    public HistModifDemandeResource(HistModifDemandeRepository histModifDemandeRepository) {
        this.histModifDemandeRepository = histModifDemandeRepository;
    }

    /**
     * {@code POST  /hist-modif-demandes} : Create a new histModifDemande.
     *
     * @param histModifDemande the histModifDemande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new histModifDemande, or with status {@code 400 (Bad Request)} if the histModifDemande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<HistModifDemande> createHistModifDemande(@RequestBody HistModifDemande histModifDemande)
        throws URISyntaxException {
        log.debug("REST request to save HistModifDemande : {}", histModifDemande);
        if (histModifDemande.getId() != null) {
            throw new BadRequestAlertException("A new histModifDemande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistModifDemande result = histModifDemandeRepository.save(histModifDemande);
        return ResponseEntity
            .created(new URI("/api/hist-modif-demandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /hist-modif-demandes/:id} : Updates an existing histModifDemande.
     *
     * @param id the id of the histModifDemande to save.
     * @param histModifDemande the histModifDemande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated histModifDemande,
     * or with status {@code 400 (Bad Request)} if the histModifDemande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the histModifDemande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<HistModifDemande> updateHistModifDemande(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HistModifDemande histModifDemande
    ) throws URISyntaxException {
        log.debug("REST request to update HistModifDemande : {}, {}", id, histModifDemande);
        if (histModifDemande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, histModifDemande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!histModifDemandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HistModifDemande result = histModifDemandeRepository.save(histModifDemande);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, histModifDemande.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /hist-modif-demandes/:id} : Partial updates given fields of an existing histModifDemande, field will ignore if it is null
     *
     * @param id the id of the histModifDemande to save.
     * @param histModifDemande the histModifDemande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated histModifDemande,
     * or with status {@code 400 (Bad Request)} if the histModifDemande is not valid,
     * or with status {@code 404 (Not Found)} if the histModifDemande is not found,
     * or with status {@code 500 (Internal Server Error)} if the histModifDemande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HistModifDemande> partialUpdateHistModifDemande(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HistModifDemande histModifDemande
    ) throws URISyntaxException {
        log.debug("REST request to partial update HistModifDemande partially : {}, {}", id, histModifDemande);
        if (histModifDemande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, histModifDemande.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!histModifDemandeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HistModifDemande> result = histModifDemandeRepository
            .findById(histModifDemande.getId())
            .map(existingHistModifDemande -> {
                if (histModifDemande.getDateModification() != null) {
                    existingHistModifDemande.setDateModification(histModifDemande.getDateModification());
                }
                if (histModifDemande.getTypeModification() != null) {
                    existingHistModifDemande.setTypeModification(histModifDemande.getTypeModification());
                }
                if (histModifDemande.getDetailsModifications() != null) {
                    existingHistModifDemande.setDetailsModifications(histModifDemande.getDetailsModifications());
                }

                return existingHistModifDemande;
            })
            .map(histModifDemandeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, histModifDemande.getId().toString())
        );
    }

    /**
     * {@code GET  /hist-modif-demandes} : get all the histModifDemandes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of histModifDemandes in body.
     */
    @GetMapping("")
    public List<HistModifDemande> getAllHistModifDemandes() {
        log.debug("REST request to get all HistModifDemandes");
        return histModifDemandeRepository.findAll();
    }

    /**
     * {@code GET  /hist-modif-demandes/:id} : get the "id" histModifDemande.
     *
     * @param id the id of the histModifDemande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the histModifDemande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<HistModifDemande> getHistModifDemande(@PathVariable("id") Long id) {
        log.debug("REST request to get HistModifDemande : {}", id);
        Optional<HistModifDemande> histModifDemande = histModifDemandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(histModifDemande);
    }

    /**
     * {@code DELETE  /hist-modif-demandes/:id} : delete the "id" histModifDemande.
     *
     * @param id the id of the histModifDemande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistModifDemande(@PathVariable("id") Long id) {
        log.debug("REST request to delete HistModifDemande : {}", id);
        histModifDemandeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
