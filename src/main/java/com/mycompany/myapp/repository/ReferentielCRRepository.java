package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ReferentielCR;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReferentielCR entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReferentielCRRepository extends JpaRepository<ReferentielCR, Long> {}
