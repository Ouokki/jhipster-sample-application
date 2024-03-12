package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Tpe;
import com.mycompany.myapp.repository.TpeRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Tpe}.
 */
@RestController
@RequestMapping("/api/tpes")
@Transactional
public class TpeResource {

    private final Logger log = LoggerFactory.getLogger(TpeResource.class);

    private static final String ENTITY_NAME = "tpe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TpeRepository tpeRepository;

    public TpeResource(TpeRepository tpeRepository) {
        this.tpeRepository = tpeRepository;
    }

    /**
     * {@code POST  /tpes} : Create a new tpe.
     *
     * @param tpe the tpe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tpe, or with status {@code 400 (Bad Request)} if the tpe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Tpe> createTpe(@RequestBody Tpe tpe) throws URISyntaxException {
        log.debug("REST request to save Tpe : {}", tpe);
        if (tpe.getId() != null) {
            throw new BadRequestAlertException("A new tpe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tpe result = tpeRepository.save(tpe);
        return ResponseEntity
            .created(new URI("/api/tpes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tpes/:id} : Updates an existing tpe.
     *
     * @param id the id of the tpe to save.
     * @param tpe the tpe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tpe,
     * or with status {@code 400 (Bad Request)} if the tpe is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tpe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Tpe> updateTpe(@PathVariable(value = "id", required = false) final Long id, @RequestBody Tpe tpe)
        throws URISyntaxException {
        log.debug("REST request to update Tpe : {}, {}", id, tpe);
        if (tpe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tpe.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tpeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Tpe result = tpeRepository.save(tpe);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tpe.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tpes/:id} : Partial updates given fields of an existing tpe, field will ignore if it is null
     *
     * @param id the id of the tpe to save.
     * @param tpe the tpe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tpe,
     * or with status {@code 400 (Bad Request)} if the tpe is not valid,
     * or with status {@code 404 (Not Found)} if the tpe is not found,
     * or with status {@code 500 (Internal Server Error)} if the tpe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Tpe> partialUpdateTpe(@PathVariable(value = "id", required = false) final Long id, @RequestBody Tpe tpe)
        throws URISyntaxException {
        log.debug("REST request to partial update Tpe partially : {}, {}", id, tpe);
        if (tpe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tpe.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tpeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Tpe> result = tpeRepository
            .findById(tpe.getId())
            .map(existingTpe -> {
                if (tpe.getImageTpe() != null) {
                    existingTpe.setImageTpe(tpe.getImageTpe());
                }
                if (tpe.getDescriptif() != null) {
                    existingTpe.setDescriptif(tpe.getDescriptif());
                }

                return existingTpe;
            })
            .map(tpeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tpe.getId().toString())
        );
    }

    /**
     * {@code GET  /tpes} : get all the tpes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tpes in body.
     */
    @GetMapping("")
    public List<Tpe> getAllTpes() {
        log.debug("REST request to get all Tpes");
        return tpeRepository.findAll();
    }

    /**
     * {@code GET  /tpes/:id} : get the "id" tpe.
     *
     * @param id the id of the tpe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tpe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Tpe> getTpe(@PathVariable("id") Long id) {
        log.debug("REST request to get Tpe : {}", id);
        Optional<Tpe> tpe = tpeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tpe);
    }

    /**
     * {@code DELETE  /tpes/:id} : delete the "id" tpe.
     *
     * @param id the id of the tpe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTpe(@PathVariable("id") Long id) {
        log.debug("REST request to delete Tpe : {}", id);
        tpeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
