package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TarifReferenceOption;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TarifReferenceOptionRepositoryWithBagRelationships {
    Optional<TarifReferenceOption> fetchBagRelationships(Optional<TarifReferenceOption> tarifReferenceOption);

    List<TarifReferenceOption> fetchBagRelationships(List<TarifReferenceOption> tarifReferenceOptions);

    Page<TarifReferenceOption> fetchBagRelationships(Page<TarifReferenceOption> tarifReferenceOptions);
}
