package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TarifReferenceOption;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TarifReferenceOptionRepositoryWithBagRelationshipsImpl implements TarifReferenceOptionRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<TarifReferenceOption> fetchBagRelationships(Optional<TarifReferenceOption> tarifReferenceOption) {
        return tarifReferenceOption.map(this::fetchReferenceOptionProduitCommerces);
    }

    @Override
    public Page<TarifReferenceOption> fetchBagRelationships(Page<TarifReferenceOption> tarifReferenceOptions) {
        return new PageImpl<>(
            fetchBagRelationships(tarifReferenceOptions.getContent()),
            tarifReferenceOptions.getPageable(),
            tarifReferenceOptions.getTotalElements()
        );
    }

    @Override
    public List<TarifReferenceOption> fetchBagRelationships(List<TarifReferenceOption> tarifReferenceOptions) {
        return Optional.of(tarifReferenceOptions).map(this::fetchReferenceOptionProduitCommerces).orElse(Collections.emptyList());
    }

    TarifReferenceOption fetchReferenceOptionProduitCommerces(TarifReferenceOption result) {
        return entityManager
            .createQuery(
                "select tarifReferenceOption from TarifReferenceOption tarifReferenceOption left join fetch tarifReferenceOption.referenceOptionProduitCommerces where tarifReferenceOption.id = :id",
                TarifReferenceOption.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<TarifReferenceOption> fetchReferenceOptionProduitCommerces(List<TarifReferenceOption> tarifReferenceOptions) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, tarifReferenceOptions.size()).forEach(index -> order.put(tarifReferenceOptions.get(index).getId(), index));
        List<TarifReferenceOption> result = entityManager
            .createQuery(
                "select tarifReferenceOption from TarifReferenceOption tarifReferenceOption left join fetch tarifReferenceOption.referenceOptionProduitCommerces where tarifReferenceOption in :tarifReferenceOptions",
                TarifReferenceOption.class
            )
            .setParameter("tarifReferenceOptions", tarifReferenceOptions)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
