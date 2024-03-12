package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TarifCommercant;
import com.mycompany.myapp.repository.TarifCommercantRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TarifCommercant}.
 */
@RestController
@RequestMapping("/api/tarif-commercants")
@Transactional
public class TarifCommercantResource {

    private final Logger log = LoggerFactory.getLogger(TarifCommercantResource.class);

    private static final String ENTITY_NAME = "tarifCommercant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TarifCommercantRepository tarifCommercantRepository;

    public TarifCommercantResource(TarifCommercantRepository tarifCommercantRepository) {
        this.tarifCommercantRepository = tarifCommercantRepository;
    }

    /**
     * {@code POST  /tarif-commercants} : Create a new tarifCommercant.
     *
     * @param tarifCommercant the tarifCommercant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tarifCommercant, or with status {@code 400 (Bad Request)} if the tarifCommercant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TarifCommercant> createTarifCommercant(@RequestBody TarifCommercant tarifCommercant) throws URISyntaxException {
        log.debug("REST request to save TarifCommercant : {}", tarifCommercant);
        if (tarifCommercant.getId() != null) {
            throw new BadRequestAlertException("A new tarifCommercant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TarifCommercant result = tarifCommercantRepository.save(tarifCommercant);
        return ResponseEntity
            .created(new URI("/api/tarif-commercants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tarif-commercants/:id} : Updates an existing tarifCommercant.
     *
     * @param id the id of the tarifCommercant to save.
     * @param tarifCommercant the tarifCommercant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarifCommercant,
     * or with status {@code 400 (Bad Request)} if the tarifCommercant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tarifCommercant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TarifCommercant> updateTarifCommercant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TarifCommercant tarifCommercant
    ) throws URISyntaxException {
        log.debug("REST request to update TarifCommercant : {}, {}", id, tarifCommercant);
        if (tarifCommercant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tarifCommercant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tarifCommercantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TarifCommercant result = tarifCommercantRepository.save(tarifCommercant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarifCommercant.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tarif-commercants/:id} : Partial updates given fields of an existing tarifCommercant, field will ignore if it is null
     *
     * @param id the id of the tarifCommercant to save.
     * @param tarifCommercant the tarifCommercant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarifCommercant,
     * or with status {@code 400 (Bad Request)} if the tarifCommercant is not valid,
     * or with status {@code 404 (Not Found)} if the tarifCommercant is not found,
     * or with status {@code 500 (Internal Server Error)} if the tarifCommercant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TarifCommercant> partialUpdateTarifCommercant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TarifCommercant tarifCommercant
    ) throws URISyntaxException {
        log.debug("REST request to partial update TarifCommercant partially : {}, {}", id, tarifCommercant);
        if (tarifCommercant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tarifCommercant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tarifCommercantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TarifCommercant> result = tarifCommercantRepository
            .findById(tarifCommercant.getId())
            .map(existingTarifCommercant -> {
                if (tarifCommercant.getTypeCommission() != null) {
                    existingTarifCommercant.setTypeCommission(tarifCommercant.getTypeCommission());
                }

                return existingTarifCommercant;
            })
            .map(tarifCommercantRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarifCommercant.getId().toString())
        );
    }

    /**
     * {@code GET  /tarif-commercants} : get all the tarifCommercants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tarifCommercants in body.
     */
    @GetMapping("")
    public List<TarifCommercant> getAllTarifCommercants() {
        log.debug("REST request to get all TarifCommercants");
        return tarifCommercantRepository.findAll();
    }

    /**
     * {@code GET  /tarif-commercants/:id} : get the "id" tarifCommercant.
     *
     * @param id the id of the tarifCommercant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tarifCommercant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TarifCommercant> getTarifCommercant(@PathVariable("id") Long id) {
        log.debug("REST request to get TarifCommercant : {}", id);
        Optional<TarifCommercant> tarifCommercant = tarifCommercantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarifCommercant);
    }

    /**
     * {@code DELETE  /tarif-commercants/:id} : delete the "id" tarifCommercant.
     *
     * @param id the id of the tarifCommercant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarifCommercant(@PathVariable("id") Long id) {
        log.debug("REST request to delete TarifCommercant : {}", id);
        tarifCommercantRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
