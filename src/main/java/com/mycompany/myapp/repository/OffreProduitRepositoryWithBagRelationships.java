package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OffreProduit;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface OffreProduitRepositoryWithBagRelationships {
    Optional<OffreProduit> fetchBagRelationships(Optional<OffreProduit> offreProduit);

    List<OffreProduit> fetchBagRelationships(List<OffreProduit> offreProduits);

    Page<OffreProduit> fetchBagRelationships(Page<OffreProduit> offreProduits);
}
