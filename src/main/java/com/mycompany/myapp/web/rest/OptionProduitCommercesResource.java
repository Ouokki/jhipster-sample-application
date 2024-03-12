package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OptionProduitCommerces;
import com.mycompany.myapp.repository.OptionProduitCommercesRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.OptionProduitCommerces}.
 */
@RestController
@RequestMapping("/api/option-produit-commerces")
@Transactional
public class OptionProduitCommercesResource {

    private final Logger log = LoggerFactory.getLogger(OptionProduitCommercesResource.class);

    private static final String ENTITY_NAME = "optionProduitCommerces";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OptionProduitCommercesRepository optionProduitCommercesRepository;

    public OptionProduitCommercesResource(OptionProduitCommercesRepository optionProduitCommercesRepository) {
        this.optionProduitCommercesRepository = optionProduitCommercesRepository;
    }

    /**
     * {@code POST  /option-produit-commerces} : Create a new optionProduitCommerces.
     *
     * @param optionProduitCommerces the optionProduitCommerces to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new optionProduitCommerces, or with status {@code 400 (Bad Request)} if the optionProduitCommerces has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<OptionProduitCommerces> createOptionProduitCommerces(@RequestBody OptionProduitCommerces optionProduitCommerces)
        throws URISyntaxException {
        log.debug("REST request to save OptionProduitCommerces : {}", optionProduitCommerces);
        if (optionProduitCommerces.getId() != null) {
            throw new BadRequestAlertException("A new optionProduitCommerces cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OptionProduitCommerces result = optionProduitCommercesRepository.save(optionProduitCommerces);
        return ResponseEntity
            .created(new URI("/api/option-produit-commerces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /option-produit-commerces/:id} : Updates an existing optionProduitCommerces.
     *
     * @param id the id of the optionProduitCommerces to save.
     * @param optionProduitCommerces the optionProduitCommerces to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated optionProduitCommerces,
     * or with status {@code 400 (Bad Request)} if the optionProduitCommerces is not valid,
     * or with status {@code 500 (Internal Server Error)} if the optionProduitCommerces couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<OptionProduitCommerces> updateOptionProduitCommerces(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OptionProduitCommerces optionProduitCommerces
    ) throws URISyntaxException {
        log.debug("REST request to update OptionProduitCommerces : {}, {}", id, optionProduitCommerces);
        if (optionProduitCommerces.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, optionProduitCommerces.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!optionProduitCommercesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OptionProduitCommerces result = optionProduitCommercesRepository.save(optionProduitCommerces);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, optionProduitCommerces.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /option-produit-commerces/:id} : Partial updates given fields of an existing optionProduitCommerces, field will ignore if it is null
     *
     * @param id the id of the optionProduitCommerces to save.
     * @param optionProduitCommerces the optionProduitCommerces to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated optionProduitCommerces,
     * or with status {@code 400 (Bad Request)} if the optionProduitCommerces is not valid,
     * or with status {@code 404 (Not Found)} if the optionProduitCommerces is not found,
     * or with status {@code 500 (Internal Server Error)} if the optionProduitCommerces couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OptionProduitCommerces> partialUpdateOptionProduitCommerces(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OptionProduitCommerces optionProduitCommerces
    ) throws URISyntaxException {
        log.debug("REST request to partial update OptionProduitCommerces partially : {}, {}", id, optionProduitCommerces);
        if (optionProduitCommerces.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, optionProduitCommerces.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!optionProduitCommercesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OptionProduitCommerces> result = optionProduitCommercesRepository
            .findById(optionProduitCommerces.getId())
            .map(optionProduitCommercesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, optionProduitCommerces.getId().toString())
        );
    }

    /**
     * {@code GET  /option-produit-commerces} : get all the optionProduitCommerces.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of optionProduitCommerces in body.
     */
    @GetMapping("")
    public List<OptionProduitCommerces> getAllOptionProduitCommerces() {
        log.debug("REST request to get all OptionProduitCommerces");
        return optionProduitCommercesRepository.findAll();
    }

    /**
     * {@code GET  /option-produit-commerces/:id} : get the "id" optionProduitCommerces.
     *
     * @param id the id of the optionProduitCommerces to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the optionProduitCommerces, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<OptionProduitCommerces> getOptionProduitCommerces(@PathVariable("id") Long id) {
        log.debug("REST request to get OptionProduitCommerces : {}", id);
        Optional<OptionProduitCommerces> optionProduitCommerces = optionProduitCommercesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(optionProduitCommerces);
    }

    /**
     * {@code DELETE  /option-produit-commerces/:id} : delete the "id" optionProduitCommerces.
     *
     * @param id the id of the optionProduitCommerces to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOptionProduitCommerces(@PathVariable("id") Long id) {
        log.debug("REST request to delete OptionProduitCommerces : {}", id);
        optionProduitCommercesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
