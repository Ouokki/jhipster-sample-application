package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Parametrage;
import com.mycompany.myapp.repository.ParametrageRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Parametrage}.
 */
@RestController
@RequestMapping("/api/parametrages")
@Transactional
public class ParametrageResource {

    private final Logger log = LoggerFactory.getLogger(ParametrageResource.class);

    private static final String ENTITY_NAME = "parametrage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParametrageRepository parametrageRepository;

    public ParametrageResource(ParametrageRepository parametrageRepository) {
        this.parametrageRepository = parametrageRepository;
    }

    /**
     * {@code POST  /parametrages} : Create a new parametrage.
     *
     * @param parametrage the parametrage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parametrage, or with status {@code 400 (Bad Request)} if the parametrage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Parametrage> createParametrage(@RequestBody Parametrage parametrage) throws URISyntaxException {
        log.debug("REST request to save Parametrage : {}", parametrage);
        if (parametrage.getId() != null) {
            throw new BadRequestAlertException("A new parametrage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parametrage result = parametrageRepository.save(parametrage);
        return ResponseEntity
            .created(new URI("/api/parametrages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parametrages/:id} : Updates an existing parametrage.
     *
     * @param id the id of the parametrage to save.
     * @param parametrage the parametrage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametrage,
     * or with status {@code 400 (Bad Request)} if the parametrage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parametrage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Parametrage> updateParametrage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Parametrage parametrage
    ) throws URISyntaxException {
        log.debug("REST request to update Parametrage : {}, {}", id, parametrage);
        if (parametrage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametrage.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parametrageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Parametrage result = parametrageRepository.save(parametrage);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parametrage.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /parametrages/:id} : Partial updates given fields of an existing parametrage, field will ignore if it is null
     *
     * @param id the id of the parametrage to save.
     * @param parametrage the parametrage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametrage,
     * or with status {@code 400 (Bad Request)} if the parametrage is not valid,
     * or with status {@code 404 (Not Found)} if the parametrage is not found,
     * or with status {@code 500 (Internal Server Error)} if the parametrage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Parametrage> partialUpdateParametrage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Parametrage parametrage
    ) throws URISyntaxException {
        log.debug("REST request to partial update Parametrage partially : {}, {}", id, parametrage);
        if (parametrage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametrage.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!parametrageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Parametrage> result = parametrageRepository.findById(parametrage.getId()).map(parametrageRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parametrage.getId().toString())
        );
    }

    /**
     * {@code GET  /parametrages} : get all the parametrages.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parametrages in body.
     */
    @GetMapping("")
    public List<Parametrage> getAllParametrages(@RequestParam(name = "filter", required = false) String filter) {
        if ("offreproduit-is-null".equals(filter)) {
            log.debug("REST request to get all Parametrages where offreProduit is null");
            return StreamSupport
                .stream(parametrageRepository.findAll().spliterator(), false)
                .filter(parametrage -> parametrage.getOffreProduit() == null)
                .toList();
        }
        log.debug("REST request to get all Parametrages");
        return parametrageRepository.findAll();
    }

    /**
     * {@code GET  /parametrages/:id} : get the "id" parametrage.
     *
     * @param id the id of the parametrage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parametrage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Parametrage> getParametrage(@PathVariable("id") Long id) {
        log.debug("REST request to get Parametrage : {}", id);
        Optional<Parametrage> parametrage = parametrageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(parametrage);
    }

    /**
     * {@code DELETE  /parametrages/:id} : delete the "id" parametrage.
     *
     * @param id the id of the parametrage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParametrage(@PathVariable("id") Long id) {
        log.debug("REST request to delete Parametrage : {}", id);
        parametrageRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
