package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TarifCommercant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TarifCommercant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TarifCommercantRepository extends JpaRepository<TarifCommercant, Long> {}
