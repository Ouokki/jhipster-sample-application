package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AutreFrais;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AutreFrais entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutreFraisRepository extends JpaRepository<AutreFrais, Long> {}
