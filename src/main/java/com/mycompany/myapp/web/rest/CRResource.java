package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CR;
import com.mycompany.myapp.repository.CRRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.CR}.
 */
@RestController
@RequestMapping("/api/crs")
@Transactional
public class CRResource {

    private final Logger log = LoggerFactory.getLogger(CRResource.class);

    private static final String ENTITY_NAME = "cR";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CRRepository cRRepository;

    public CRResource(CRRepository cRRepository) {
        this.cRRepository = cRRepository;
    }

    /**
     * {@code POST  /crs} : Create a new cR.
     *
     * @param cR the cR to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cR, or with status {@code 400 (Bad Request)} if the cR has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CR> createCR(@RequestBody CR cR) throws URISyntaxException {
        log.debug("REST request to save CR : {}", cR);
        if (cR.getId() != null) {
            throw new BadRequestAlertException("A new cR cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CR result = cRRepository.save(cR);
        return ResponseEntity
            .created(new URI("/api/crs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crs/:id} : Updates an existing cR.
     *
     * @param id the id of the cR to save.
     * @param cR the cR to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cR,
     * or with status {@code 400 (Bad Request)} if the cR is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cR couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CR> updateCR(@PathVariable(value = "id", required = false) final Long id, @RequestBody CR cR)
        throws URISyntaxException {
        log.debug("REST request to update CR : {}, {}", id, cR);
        if (cR.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cR.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cRRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CR result = cRRepository.save(cR);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cR.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /crs/:id} : Partial updates given fields of an existing cR, field will ignore if it is null
     *
     * @param id the id of the cR to save.
     * @param cR the cR to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cR,
     * or with status {@code 400 (Bad Request)} if the cR is not valid,
     * or with status {@code 404 (Not Found)} if the cR is not found,
     * or with status {@code 500 (Internal Server Error)} if the cR couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CR> partialUpdateCR(@PathVariable(value = "id", required = false) final Long id, @RequestBody CR cR)
        throws URISyntaxException {
        log.debug("REST request to partial update CR partially : {}, {}", id, cR);
        if (cR.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cR.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cRRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CR> result = cRRepository
            .findById(cR.getId())
            .map(existingCR -> {
                if (cR.getIsAvem() != null) {
                    existingCR.setIsAvem(cR.getIsAvem());
                }
                if (cR.getIsAmex() != null) {
                    existingCR.setIsAmex(cR.getIsAmex());
                }

                return existingCR;
            })
            .map(cRRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cR.getId().toString())
        );
    }

    /**
     * {@code GET  /crs} : get all the cRS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cRS in body.
     */
    @GetMapping("")
    public List<CR> getAllCRS() {
        log.debug("REST request to get all CRS");
        return cRRepository.findAll();
    }

    /**
     * {@code GET  /crs/:id} : get the "id" cR.
     *
     * @param id the id of the cR to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cR, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CR> getCR(@PathVariable("id") Long id) {
        log.debug("REST request to get CR : {}", id);
        Optional<CR> cR = cRRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cR);
    }

    /**
     * {@code DELETE  /crs/:id} : delete the "id" cR.
     *
     * @param id the id of the cR to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCR(@PathVariable("id") Long id) {
        log.debug("REST request to delete CR : {}", id);
        cRRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
