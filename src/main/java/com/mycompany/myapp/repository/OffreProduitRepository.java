package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OffreProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OffreProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OffreProduitRepository extends JpaRepository<OffreProduit, Long> {}
