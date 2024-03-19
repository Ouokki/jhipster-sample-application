package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Garantie;
import com.mycompany.myapp.repository.GarantieRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Garantie}.
 */
@RestController
@RequestMapping("/api/garanties")
@Transactional
public class GarantieResource {

    private final Logger log = LoggerFactory.getLogger(GarantieResource.class);

    private static final String ENTITY_NAME = "garantie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GarantieRepository garantieRepository;

    public GarantieResource(GarantieRepository garantieRepository) {
        this.garantieRepository = garantieRepository;
    }

    /**
     * {@code POST  /garanties} : Create a new garantie.
     *
     * @param garantie the garantie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new garantie, or with status {@code 400 (Bad Request)} if the garantie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Garantie> createGarantie(@RequestBody Garantie garantie) throws URISyntaxException {
        log.debug("REST request to save Garantie : {}", garantie);
        if (garantie.getId() != null) {
            throw new BadRequestAlertException("A new garantie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Garantie result = garantieRepository.save(garantie);
        return ResponseEntity
            .created(new URI("/api/garanties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /garanties/:id} : Updates an existing garantie.
     *
     * @param id the id of the garantie to save.
     * @param garantie the garantie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated garantie,
     * or with status {@code 400 (Bad Request)} if the garantie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the garantie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Garantie> updateGarantie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Garantie garantie
    ) throws URISyntaxException {
        log.debug("REST request to update Garantie : {}, {}", id, garantie);
        if (garantie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, garantie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!garantieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Garantie result = garantieRepository.save(garantie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, garantie.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /garanties/:id} : Partial updates given fields of an existing garantie, field will ignore if it is null
     *
     * @param id the id of the garantie to save.
     * @param garantie the garantie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated garantie,
     * or with status {@code 400 (Bad Request)} if the garantie is not valid,
     * or with status {@code 404 (Not Found)} if the garantie is not found,
     * or with status {@code 500 (Internal Server Error)} if the garantie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Garantie> partialUpdateGarantie(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Garantie garantie
    ) throws URISyntaxException {
        log.debug("REST request to partial update Garantie partially : {}, {}", id, garantie);
        if (garantie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, garantie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!garantieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Garantie> result = garantieRepository
            .findById(garantie.getId())
            .map(existingGarantie -> {
                if (garantie.getMontantAutorisationTransaction() != null) {
                    existingGarantie.setMontantAutorisationTransaction(garantie.getMontantAutorisationTransaction());
                }
                if (garantie.getMontantAutorisationTPE() != null) {
                    existingGarantie.setMontantAutorisationTPE(garantie.getMontantAutorisationTPE());
                }
                if (garantie.getDelaiRemise() != null) {
                    existingGarantie.setDelaiRemise(garantie.getDelaiRemise());
                }
                if (garantie.getDelaiCommunicationJustificatif() != null) {
                    existingGarantie.setDelaiCommunicationJustificatif(garantie.getDelaiCommunicationJustificatif());
                }

                return existingGarantie;
            })
            .map(garantieRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, garantie.getId().toString())
        );
    }

    /**
     * {@code GET  /garanties} : get all the garanties.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of garanties in body.
     */
    @GetMapping("")
    public List<Garantie> getAllGaranties(@RequestParam(name = "filter", required = false) String filter) {
        if ("parametrage-is-null".equals(filter)) {
            log.debug("REST request to get all Garanties where parametrage is null");
            return StreamSupport
                .stream(garantieRepository.findAll().spliterator(), false)
                .filter(garantie -> garantie.getParametrage() == null)
                .toList();
        }
        log.debug("REST request to get all Garanties");
        return garantieRepository.findAll();
    }

    /**
     * {@code GET  /garanties/:id} : get the "id" garantie.
     *
     * @param id the id of the garantie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the garantie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Garantie> getGarantie(@PathVariable("id") Long id) {
        log.debug("REST request to get Garantie : {}", id);
        Optional<Garantie> garantie = garantieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(garantie);
    }

    /**
     * {@code DELETE  /garanties/:id} : delete the "id" garantie.
     *
     * @param id the id of the garantie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarantie(@PathVariable("id") Long id) {
        log.debug("REST request to delete Garantie : {}", id);
        garantieRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
