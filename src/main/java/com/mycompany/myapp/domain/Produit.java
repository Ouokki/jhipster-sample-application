package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produit.
 */
@Entity
@Table(name = "produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Produit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "code_produit")
    private String codeProduit;

    @Column(name = "libelle_produit")
    private String libelleProduit;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "produits")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "parametrage", "cr", "offres", "produits" }, allowSetters = true)
    private Set<OffreProduit> offreProduits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Produit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeProduit() {
        return this.codeProduit;
    }

    public Produit codeProduit(String codeProduit) {
        this.setCodeProduit(codeProduit);
        return this;
    }

    public void setCodeProduit(String codeProduit) {
        this.codeProduit = codeProduit;
    }

    public String getLibelleProduit() {
        return this.libelleProduit;
    }

    public Produit libelleProduit(String libelleProduit) {
        this.setLibelleProduit(libelleProduit);
        return this;
    }

    public void setLibelleProduit(String libelleProduit) {
        this.libelleProduit = libelleProduit;
    }

    public Set<OffreProduit> getOffreProduits() {
        return this.offreProduits;
    }

    public void setOffreProduits(Set<OffreProduit> offreProduits) {
        if (this.offreProduits != null) {
            this.offreProduits.forEach(i -> i.removeProduit(this));
        }
        if (offreProduits != null) {
            offreProduits.forEach(i -> i.addProduit(this));
        }
        this.offreProduits = offreProduits;
    }

    public Produit offreProduits(Set<OffreProduit> offreProduits) {
        this.setOffreProduits(offreProduits);
        return this;
    }

    public Produit addOffreProduit(OffreProduit offreProduit) {
        this.offreProduits.add(offreProduit);
        offreProduit.getProduits().add(this);
        return this;
    }

    public Produit removeOffreProduit(OffreProduit offreProduit) {
        this.offreProduits.remove(offreProduit);
        offreProduit.getProduits().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produit)) {
            return false;
        }
        return getId() != null && getId().equals(((Produit) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produit{" +
            "id=" + getId() +
            ", codeProduit='" + getCodeProduit() + "'" +
            ", libelleProduit='" + getLibelleProduit() + "'" +
            "}";
    }
}
