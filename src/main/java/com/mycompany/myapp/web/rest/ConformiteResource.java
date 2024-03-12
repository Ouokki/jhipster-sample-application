package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Conformite;
import com.mycompany.myapp.repository.ConformiteRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Conformite}.
 */
@RestController
@RequestMapping("/api/conformites")
@Transactional
public class ConformiteResource {

    private final Logger log = LoggerFactory.getLogger(ConformiteResource.class);

    private static final String ENTITY_NAME = "conformite";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConformiteRepository conformiteRepository;

    public ConformiteResource(ConformiteRepository conformiteRepository) {
        this.conformiteRepository = conformiteRepository;
    }

    /**
     * {@code POST  /conformites} : Create a new conformite.
     *
     * @param conformite the conformite to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conformite, or with status {@code 400 (Bad Request)} if the conformite has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Conformite> createConformite(@RequestBody Conformite conformite) throws URISyntaxException {
        log.debug("REST request to save Conformite : {}", conformite);
        if (conformite.getId() != null) {
            throw new BadRequestAlertException("A new conformite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conformite result = conformiteRepository.save(conformite);
        return ResponseEntity
            .created(new URI("/api/conformites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conformites/:id} : Updates an existing conformite.
     *
     * @param id the id of the conformite to save.
     * @param conformite the conformite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conformite,
     * or with status {@code 400 (Bad Request)} if the conformite is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conformite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Conformite> updateConformite(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Conformite conformite
    ) throws URISyntaxException {
        log.debug("REST request to update Conformite : {}, {}", id, conformite);
        if (conformite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conformite.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conformiteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Conformite result = conformiteRepository.save(conformite);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conformite.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /conformites/:id} : Partial updates given fields of an existing conformite, field will ignore if it is null
     *
     * @param id the id of the conformite to save.
     * @param conformite the conformite to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conformite,
     * or with status {@code 400 (Bad Request)} if the conformite is not valid,
     * or with status {@code 404 (Not Found)} if the conformite is not found,
     * or with status {@code 500 (Internal Server Error)} if the conformite couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Conformite> partialUpdateConformite(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Conformite conformite
    ) throws URISyntaxException {
        log.debug("REST request to partial update Conformite partially : {}, {}", id, conformite);
        if (conformite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conformite.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conformiteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Conformite> result = conformiteRepository
            .findById(conformite.getId())
            .map(existingConformite -> {
                if (conformite.getAffichage() != null) {
                    existingConformite.setAffichage(conformite.getAffichage());
                }
                if (conformite.getLienBonita() != null) {
                    existingConformite.setLienBonita(conformite.getLienBonita());
                }

                return existingConformite;
            })
            .map(conformiteRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conformite.getId().toString())
        );
    }

    /**
     * {@code GET  /conformites} : get all the conformites.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conformites in body.
     */
    @GetMapping("")
    public List<Conformite> getAllConformites() {
        log.debug("REST request to get all Conformites");
        return conformiteRepository.findAll();
    }

    /**
     * {@code GET  /conformites/:id} : get the "id" conformite.
     *
     * @param id the id of the conformite to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conformite, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Conformite> getConformite(@PathVariable("id") Long id) {
        log.debug("REST request to get Conformite : {}", id);
        Optional<Conformite> conformite = conformiteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(conformite);
    }

    /**
     * {@code DELETE  /conformites/:id} : delete the "id" conformite.
     *
     * @param id the id of the conformite to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConformite(@PathVariable("id") Long id) {
        log.debug("REST request to delete Conformite : {}", id);
        conformiteRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
