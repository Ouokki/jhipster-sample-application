package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Parametrage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Parametrage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParametrageRepository extends JpaRepository<Parametrage, Long> {}
