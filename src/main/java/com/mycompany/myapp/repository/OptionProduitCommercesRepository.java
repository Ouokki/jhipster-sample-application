package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OptionProduitCommerces;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OptionProduitCommerces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OptionProduitCommercesRepository extends JpaRepository<OptionProduitCommerces, Long> {}
