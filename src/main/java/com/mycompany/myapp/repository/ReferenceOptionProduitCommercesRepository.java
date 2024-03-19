package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ReferenceOptionProduitCommerces;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReferenceOptionProduitCommerces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReferenceOptionProduitCommercesRepository extends JpaRepository<ReferenceOptionProduitCommerces, Long> {}
