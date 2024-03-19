package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HistModifDemande;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the HistModifDemande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistModifDemandeRepository extends JpaRepository<HistModifDemande, Long> {}
