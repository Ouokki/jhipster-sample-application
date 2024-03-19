package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Conformite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Conformite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConformiteRepository extends JpaRepository<Conformite, Long> {}
