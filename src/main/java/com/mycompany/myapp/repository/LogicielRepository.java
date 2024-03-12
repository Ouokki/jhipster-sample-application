package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Logiciel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Logiciel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogicielRepository extends JpaRepository<Logiciel, Long> {}
