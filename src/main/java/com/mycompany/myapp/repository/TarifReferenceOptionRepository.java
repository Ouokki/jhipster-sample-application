package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TarifReferenceOption;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TarifReferenceOption entity.
 *
 * When extending this class, extend TarifReferenceOptionRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface TarifReferenceOptionRepository
    extends TarifReferenceOptionRepositoryWithBagRelationships, JpaRepository<TarifReferenceOption, Long> {
    default Optional<TarifReferenceOption> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<TarifReferenceOption> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<TarifReferenceOption> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
