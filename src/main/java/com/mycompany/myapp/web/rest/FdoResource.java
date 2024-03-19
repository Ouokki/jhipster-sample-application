package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Fdo;
import com.mycompany.myapp.repository.FdoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Fdo}.
 */
@RestController
@RequestMapping("/api/fdos")
@Transactional
public class FdoResource {

    private final Logger log = LoggerFactory.getLogger(FdoResource.class);

    private static final String ENTITY_NAME = "fdo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FdoRepository fdoRepository;

    public FdoResource(FdoRepository fdoRepository) {
        this.fdoRepository = fdoRepository;
    }

    /**
     * {@code POST  /fdos} : Create a new fdo.
     *
     * @param fdo the fdo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fdo, or with status {@code 400 (Bad Request)} if the fdo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Fdo> createFdo(@RequestBody Fdo fdo) throws URISyntaxException {
        log.debug("REST request to save Fdo : {}", fdo);
        if (fdo.getId() != null) {
            throw new BadRequestAlertException("A new fdo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fdo result = fdoRepository.save(fdo);
        return ResponseEntity
            .created(new URI("/api/fdos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fdos/:id} : Updates an existing fdo.
     *
     * @param id the id of the fdo to save.
     * @param fdo the fdo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fdo,
     * or with status {@code 400 (Bad Request)} if the fdo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fdo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Fdo> updateFdo(@PathVariable(value = "id", required = false) final Long id, @RequestBody Fdo fdo)
        throws URISyntaxException {
        log.debug("REST request to update Fdo : {}, {}", id, fdo);
        if (fdo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fdo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fdoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        // no save call needed as we have no fields that can be updated
        Fdo result = fdo;
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fdo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /fdos/:id} : Partial updates given fields of an existing fdo, field will ignore if it is null
     *
     * @param id the id of the fdo to save.
     * @param fdo the fdo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fdo,
     * or with status {@code 400 (Bad Request)} if the fdo is not valid,
     * or with status {@code 404 (Not Found)} if the fdo is not found,
     * or with status {@code 500 (Internal Server Error)} if the fdo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Fdo> partialUpdateFdo(@PathVariable(value = "id", required = false) final Long id, @RequestBody Fdo fdo)
        throws URISyntaxException {
        log.debug("REST request to partial update Fdo partially : {}, {}", id, fdo);
        if (fdo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fdo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fdoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Fdo> result = fdoRepository.findById(fdo.getId())// .map(fdoRepository::save)
        ;

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fdo.getId().toString())
        );
    }

    /**
     * {@code GET  /fdos} : get all the fdos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fdos in body.
     */
    @GetMapping("")
    public List<Fdo> getAllFdos() {
        log.debug("REST request to get all Fdos");
        return fdoRepository.findAll();
    }

    /**
     * {@code GET  /fdos/:id} : get the "id" fdo.
     *
     * @param id the id of the fdo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fdo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Fdo> getFdo(@PathVariable("id") Long id) {
        log.debug("REST request to get Fdo : {}", id);
        Optional<Fdo> fdo = fdoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fdo);
    }

    /**
     * {@code DELETE  /fdos/:id} : delete the "id" fdo.
     *
     * @param id the id of the fdo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFdo(@PathVariable("id") Long id) {
        log.debug("REST request to delete Fdo : {}", id);
        fdoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
