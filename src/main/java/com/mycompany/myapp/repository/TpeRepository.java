package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tpe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Tpe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TpeRepository extends JpaRepository<Tpe, Long> {}
