package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CR;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CR entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CRRepository extends JpaRepository<CR, Long> {}
