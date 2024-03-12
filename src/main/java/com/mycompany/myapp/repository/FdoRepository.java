package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Fdo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Fdo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FdoRepository extends JpaRepository<Fdo, Long> {}
