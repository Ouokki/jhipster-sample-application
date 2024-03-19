package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AutreFrais;
import com.mycompany.myapp.repository.AutreFraisRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.AutreFrais}.
 */
@RestController
@RequestMapping("/api/autre-frais")
@Transactional
public class AutreFraisResource {

    private final Logger log = LoggerFactory.getLogger(AutreFraisResource.class);

    private static final String ENTITY_NAME = "autreFrais";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutreFraisRepository autreFraisRepository;

    public AutreFraisResource(AutreFraisRepository autreFraisRepository) {
        this.autreFraisRepository = autreFraisRepository;
    }

    /**
     * {@code POST  /autre-frais} : Create a new autreFrais.
     *
     * @param autreFrais the autreFrais to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new autreFrais, or with status {@code 400 (Bad Request)} if the autreFrais has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AutreFrais> createAutreFrais(@RequestBody AutreFrais autreFrais) throws URISyntaxException {
        log.debug("REST request to save AutreFrais : {}", autreFrais);
        if (autreFrais.getId() != null) {
            throw new BadRequestAlertException("A new autreFrais cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AutreFrais result = autreFraisRepository.save(autreFrais);
        return ResponseEntity
            .created(new URI("/api/autre-frais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /autre-frais/:id} : Updates an existing autreFrais.
     *
     * @param id the id of the autreFrais to save.
     * @param autreFrais the autreFrais to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autreFrais,
     * or with status {@code 400 (Bad Request)} if the autreFrais is not valid,
     * or with status {@code 500 (Internal Server Error)} if the autreFrais couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AutreFrais> updateAutreFrais(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AutreFrais autreFrais
    ) throws URISyntaxException {
        log.debug("REST request to update AutreFrais : {}, {}", id, autreFrais);
        if (autreFrais.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, autreFrais.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!autreFraisRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AutreFrais result = autreFraisRepository.save(autreFrais);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, autreFrais.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /autre-frais/:id} : Partial updates given fields of an existing autreFrais, field will ignore if it is null
     *
     * @param id the id of the autreFrais to save.
     * @param autreFrais the autreFrais to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autreFrais,
     * or with status {@code 400 (Bad Request)} if the autreFrais is not valid,
     * or with status {@code 404 (Not Found)} if the autreFrais is not found,
     * or with status {@code 500 (Internal Server Error)} if the autreFrais couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AutreFrais> partialUpdateAutreFrais(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AutreFrais autreFrais
    ) throws URISyntaxException {
        log.debug("REST request to partial update AutreFrais partially : {}, {}", id, autreFrais);
        if (autreFrais.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, autreFrais.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!autreFraisRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AutreFrais> result = autreFraisRepository
            .findById(autreFrais.getId())
            .map(existingAutreFrais -> {
                if (autreFrais.getDomaineFrais() != null) {
                    existingAutreFrais.setDomaineFrais(autreFrais.getDomaineFrais());
                }

                return existingAutreFrais;
            })
            .map(autreFraisRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, autreFrais.getId().toString())
        );
    }

    /**
     * {@code GET  /autre-frais} : get all the autreFrais.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autreFrais in body.
     */
    @GetMapping("")
    public List<AutreFrais> getAllAutreFrais() {
        log.debug("REST request to get all AutreFrais");
        return autreFraisRepository.findAll();
    }

    /**
     * {@code GET  /autre-frais/:id} : get the "id" autreFrais.
     *
     * @param id the id of the autreFrais to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the autreFrais, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AutreFrais> getAutreFrais(@PathVariable("id") Long id) {
        log.debug("REST request to get AutreFrais : {}", id);
        Optional<AutreFrais> autreFrais = autreFraisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autreFrais);
    }

    /**
     * {@code DELETE  /autre-frais/:id} : delete the "id" autreFrais.
     *
     * @param id the id of the autreFrais to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAutreFrais(@PathVariable("id") Long id) {
        log.debug("REST request to delete AutreFrais : {}", id);
        autreFraisRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
