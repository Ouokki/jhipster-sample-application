package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OffreProduit;
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
public class OffreProduitRepositoryWithBagRelationshipsImpl implements OffreProduitRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<OffreProduit> fetchBagRelationships(Optional<OffreProduit> offreProduit) {
        return offreProduit.map(this::fetchOffres).map(this::fetchProduits);
    }

    @Override
    public Page<OffreProduit> fetchBagRelationships(Page<OffreProduit> offreProduits) {
        return new PageImpl<>(
            fetchBagRelationships(offreProduits.getContent()),
            offreProduits.getPageable(),
            offreProduits.getTotalElements()
        );
    }

    @Override
    public List<OffreProduit> fetchBagRelationships(List<OffreProduit> offreProduits) {
        return Optional.of(offreProduits).map(this::fetchOffres).map(this::fetchProduits).orElse(Collections.emptyList());
    }

    OffreProduit fetchOffres(OffreProduit result) {
        return entityManager
            .createQuery(
                "select offreProduit from OffreProduit offreProduit left join fetch offreProduit.offres where offreProduit.id = :id",
                OffreProduit.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<OffreProduit> fetchOffres(List<OffreProduit> offreProduits) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, offreProduits.size()).forEach(index -> order.put(offreProduits.get(index).getId(), index));
        List<OffreProduit> result = entityManager
            .createQuery(
                "select offreProduit from OffreProduit offreProduit left join fetch offreProduit.offres where offreProduit in :offreProduits",
                OffreProduit.class
            )
            .setParameter("offreProduits", offreProduits)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    OffreProduit fetchProduits(OffreProduit result) {
        return entityManager
            .createQuery(
                "select offreProduit from OffreProduit offreProduit left join fetch offreProduit.produits where offreProduit.id = :id",
                OffreProduit.class
            )
            .setParameter("id", result.getId())
            .getSingleResult();
    }

    List<OffreProduit> fetchProduits(List<OffreProduit> offreProduits) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, offreProduits.size()).forEach(index -> order.put(offreProduits.get(index).getId(), index));
        List<OffreProduit> result = entityManager
            .createQuery(
                "select offreProduit from OffreProduit offreProduit left join fetch offreProduit.produits where offreProduit in :offreProduits",
                OffreProduit.class
            )
            .setParameter("offreProduits", offreProduits)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
