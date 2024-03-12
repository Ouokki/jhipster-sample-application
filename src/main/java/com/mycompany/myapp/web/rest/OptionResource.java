package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Option;
import com.mycompany.myapp.repository.OptionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Option}.
 */
@RestController
@RequestMapping("/api/options")
@Transactional
public class OptionResource {

    private final Logger log = LoggerFactory.getLogger(OptionResource.class);

    private static final String ENTITY_NAME = "option";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OptionRepository optionRepository;

    public OptionResource(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    /**
     * {@code POST  /options} : Create a new option.
     *
     * @param option the option to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new option, or with status {@code 400 (Bad Request)} if the option has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Option> createOption(@RequestBody Option option) throws URISyntaxException {
        log.debug("REST request to save Option : {}", option);
        if (option.getId() != null) {
            throw new BadRequestAlertException("A new option cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Option result = optionRepository.save(option);
        return ResponseEntity
            .created(new URI("/api/options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /options/:id} : Updates an existing option.
     *
     * @param id the id of the option to save.
     * @param option the option to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated option,
     * or with status {@code 400 (Bad Request)} if the option is not valid,
     * or with status {@code 500 (Internal Server Error)} if the option couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Option> updateOption(@PathVariable(value = "id", required = false) final Long id, @RequestBody Option option)
        throws URISyntaxException {
        log.debug("REST request to update Option : {}, {}", id, option);
        if (option.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, option.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!optionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        // no save call needed as we have no fields that can be updated
        Option result = option;
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, option.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /options/:id} : Partial updates given fields of an existing option, field will ignore if it is null
     *
     * @param id the id of the option to save.
     * @param option the option to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated option,
     * or with status {@code 400 (Bad Request)} if the option is not valid,
     * or with status {@code 404 (Not Found)} if the option is not found,
     * or with status {@code 500 (Internal Server Error)} if the option couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Option> partialUpdateOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Option option
    ) throws URISyntaxException {
        log.debug("REST request to partial update Option partially : {}, {}", id, option);
        if (option.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, option.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!optionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Option> result = optionRepository.findById(option.getId())// .map(optionRepository::save)
        ;

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, option.getId().toString())
        );
    }

    /**
     * {@code GET  /options} : get all the options.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of options in body.
     */
    @GetMapping("")
    public List<Option> getAllOptions() {
        log.debug("REST request to get all Options");
        return optionRepository.findAll();
    }

    /**
     * {@code GET  /options/:id} : get the "id" option.
     *
     * @param id the id of the option to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the option, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Option> getOption(@PathVariable("id") Long id) {
        log.debug("REST request to get Option : {}", id);
        Optional<Option> option = optionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(option);
    }

    /**
     * {@code DELETE  /options/:id} : delete the "id" option.
     *
     * @param id the id of the option to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable("id") Long id) {
        log.debug("REST request to delete Option : {}", id);
        optionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
