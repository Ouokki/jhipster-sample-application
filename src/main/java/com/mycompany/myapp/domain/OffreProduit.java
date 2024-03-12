package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OffreProduit.
 */
@Entity
@Table(name = "offre_produit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OffreProduit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "active_prod")
    private Boolean activeProd;

    @Column(name = "active_nehom")
    private Boolean activeNEHOM;

    @Column(name = "active_vmoa")
    private Boolean activeVMOA;

    @Column(name = "active_devtu")
    private Boolean activeDEVTU;

    @JsonIgnoreProperties(
        value = { "garantie", "demande", "tarifCommercant", "optionProduitCommerces", "conformite", "offreProduit" },
        allowSetters = true
    )
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Parametrage parametrage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "referentielCRS", "offreProduits" }, allowSetters = true)
    private CR cr;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_offre_produit__offre",
        joinColumns = @JoinColumn(name = "offre_produit_id"),
        inverseJoinColumns = @JoinColumn(name = "offre_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "offreProduits" }, allowSetters = true)
    private Set<Offre> offres = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_offre_produit__produit",
        joinColumns = @JoinColumn(name = "offre_produit_id"),
        inverseJoinColumns = @JoinColumn(name = "produit_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "offreProduits" }, allowSetters = true)
    private Set<Produit> produits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public OffreProduit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getActiveProd() {
        return this.activeProd;
    }

    public OffreProduit activeProd(Boolean activeProd) {
        this.setActiveProd(activeProd);
        return this;
    }

    public void setActiveProd(Boolean activeProd) {
        this.activeProd = activeProd;
    }

    public Boolean getActiveNEHOM() {
        return this.activeNEHOM;
    }

    public OffreProduit activeNEHOM(Boolean activeNEHOM) {
        this.setActiveNEHOM(activeNEHOM);
        return this;
    }

    public void setActiveNEHOM(Boolean activeNEHOM) {
        this.activeNEHOM = activeNEHOM;
    }

    public Boolean getActiveVMOA() {
        return this.activeVMOA;
    }

    public OffreProduit activeVMOA(Boolean activeVMOA) {
        this.setActiveVMOA(activeVMOA);
        return this;
    }

    public void setActiveVMOA(Boolean activeVMOA) {
        this.activeVMOA = activeVMOA;
    }

    public Boolean getActiveDEVTU() {
        return this.activeDEVTU;
    }

    public OffreProduit activeDEVTU(Boolean activeDEVTU) {
        this.setActiveDEVTU(activeDEVTU);
        return this;
    }

    public void setActiveDEVTU(Boolean activeDEVTU) {
        this.activeDEVTU = activeDEVTU;
    }

    public Parametrage getParametrage() {
        return this.parametrage;
    }

    public void setParametrage(Parametrage parametrage) {
        this.parametrage = parametrage;
    }

    public OffreProduit parametrage(Parametrage parametrage) {
        this.setParametrage(parametrage);
        return this;
    }

    public CR getCr() {
        return this.cr;
    }

    public void setCr(CR cR) {
        this.cr = cR;
    }

    public OffreProduit cr(CR cR) {
        this.setCr(cR);
        return this;
    }

    public Set<Offre> getOffres() {
        return this.offres;
    }

    public void setOffres(Set<Offre> offres) {
        this.offres = offres;
    }

    public OffreProduit offres(Set<Offre> offres) {
        this.setOffres(offres);
        return this;
    }

    public OffreProduit addOffre(Offre offre) {
        this.offres.add(offre);
        return this;
    }

    public OffreProduit removeOffre(Offre offre) {
        this.offres.remove(offre);
        return this;
    }

    public Set<Produit> getProduits() {
        return this.produits;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }

    public OffreProduit produits(Set<Produit> produits) {
        this.setProduits(produits);
        return this;
    }

    public OffreProduit addProduit(Produit produit) {
        this.produits.add(produit);
        return this;
    }

    public OffreProduit removeProduit(Produit produit) {
        this.produits.remove(produit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OffreProduit)) {
            return false;
        }
        return getId() != null && getId().equals(((OffreProduit) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OffreProduit{" +
            "id=" + getId() +
            ", activeProd='" + getActiveProd() + "'" +
            ", activeNEHOM='" + getActiveNEHOM() + "'" +
            ", activeVMOA='" + getActiveVMOA() + "'" +
            ", activeDEVTU='" + getActiveDEVTU() + "'" +
            "}";
    }
}
