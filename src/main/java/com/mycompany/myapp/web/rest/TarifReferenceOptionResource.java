package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TarifReferenceOption;
import com.mycompany.myapp.repository.TarifReferenceOptionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TarifReferenceOption}.
 */
@RestController
@RequestMapping("/api/tarif-reference-options")
@Transactional
public class TarifReferenceOptionResource {

    private final Logger log = LoggerFactory.getLogger(TarifReferenceOptionResource.class);

    private static final String ENTITY_NAME = "tarifReferenceOption";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TarifReferenceOptionRepository tarifReferenceOptionRepository;

    public TarifReferenceOptionResource(TarifReferenceOptionRepository tarifReferenceOptionRepository) {
        this.tarifReferenceOptionRepository = tarifReferenceOptionRepository;
    }

    /**
     * {@code POST  /tarif-reference-options} : Create a new tarifReferenceOption.
     *
     * @param tarifReferenceOption the tarifReferenceOption to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tarifReferenceOption, or with status {@code 400 (Bad Request)} if the tarifReferenceOption has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TarifReferenceOption> createTarifReferenceOption(@RequestBody TarifReferenceOption tarifReferenceOption)
        throws URISyntaxException {
        log.debug("REST request to save TarifReferenceOption : {}", tarifReferenceOption);
        if (tarifReferenceOption.getId() != null) {
            throw new BadRequestAlertException("A new tarifReferenceOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TarifReferenceOption result = tarifReferenceOptionRepository.save(tarifReferenceOption);
        return ResponseEntity
            .created(new URI("/api/tarif-reference-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tarif-reference-options/:id} : Updates an existing tarifReferenceOption.
     *
     * @param id the id of the tarifReferenceOption to save.
     * @param tarifReferenceOption the tarifReferenceOption to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarifReferenceOption,
     * or with status {@code 400 (Bad Request)} if the tarifReferenceOption is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tarifReferenceOption couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TarifReferenceOption> updateTarifReferenceOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TarifReferenceOption tarifReferenceOption
    ) throws URISyntaxException {
        log.debug("REST request to update TarifReferenceOption : {}, {}", id, tarifReferenceOption);
        if (tarifReferenceOption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tarifReferenceOption.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tarifReferenceOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TarifReferenceOption result = tarifReferenceOptionRepository.save(tarifReferenceOption);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarifReferenceOption.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tarif-reference-options/:id} : Partial updates given fields of an existing tarifReferenceOption, field will ignore if it is null
     *
     * @param id the id of the tarifReferenceOption to save.
     * @param tarifReferenceOption the tarifReferenceOption to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tarifReferenceOption,
     * or with status {@code 400 (Bad Request)} if the tarifReferenceOption is not valid,
     * or with status {@code 404 (Not Found)} if the tarifReferenceOption is not found,
     * or with status {@code 500 (Internal Server Error)} if the tarifReferenceOption couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TarifReferenceOption> partialUpdateTarifReferenceOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody TarifReferenceOption tarifReferenceOption
    ) throws URISyntaxException {
        log.debug("REST request to partial update TarifReferenceOption partially : {}, {}", id, tarifReferenceOption);
        if (tarifReferenceOption.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tarifReferenceOption.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tarifReferenceOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TarifReferenceOption> result = tarifReferenceOptionRepository
            .findById(tarifReferenceOption.getId())
            .map(existingTarifReferenceOption -> {
                if (tarifReferenceOption.getTrigramme() != null) {
                    existingTarifReferenceOption.setTrigramme(tarifReferenceOption.getTrigramme());
                }

                return existingTarifReferenceOption;
            })
            .map(tarifReferenceOptionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tarifReferenceOption.getId().toString())
        );
    }

    /**
     * {@code GET  /tarif-reference-options} : get all the tarifReferenceOptions.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tarifReferenceOptions in body.
     */
    @GetMapping("")
    public List<TarifReferenceOption> getAllTarifReferenceOptions(
        @RequestParam(name = "filter", required = false) String filter,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        if ("optionproduitcommerces-is-null".equals(filter)) {
            log.debug("REST request to get all TarifReferenceOptions where optionProduitCommerces is null");
            return StreamSupport
                .stream(tarifReferenceOptionRepository.findAll().spliterator(), false)
                .filter(tarifReferenceOption -> tarifReferenceOption.getOptionProduitCommerces() == null)
                .toList();
        }
        log.debug("REST request to get all TarifReferenceOptions");
        if (eagerload) {
            return tarifReferenceOptionRepository.findAllWithEagerRelationships();
        } else {
            return tarifReferenceOptionRepository.findAll();
        }
    }

    /**
     * {@code GET  /tarif-reference-options/:id} : get the "id" tarifReferenceOption.
     *
     * @param id the id of the tarifReferenceOption to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tarifReferenceOption, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TarifReferenceOption> getTarifReferenceOption(@PathVariable("id") Long id) {
        log.debug("REST request to get TarifReferenceOption : {}", id);
        Optional<TarifReferenceOption> tarifReferenceOption = tarifReferenceOptionRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(tarifReferenceOption);
    }

    /**
     * {@code DELETE  /tarif-reference-options/:id} : delete the "id" tarifReferenceOption.
     *
     * @param id the id of the tarifReferenceOption to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarifReferenceOption(@PathVariable("id") Long id) {
        log.debug("REST request to delete TarifReferenceOption : {}", id);
        tarifReferenceOptionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
