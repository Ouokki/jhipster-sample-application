package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Parametrage.
 */
@Entity
@Table(name = "parametrage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Parametrage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @JsonIgnoreProperties(value = { "parametrage" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Garantie garantie;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parametrage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "histModifDemandes", "parametrage" }, allowSetters = true)
    private Set<Demande> demandes = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parametrage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tarif", "parametrage" }, allowSetters = true)
    private Set<TarifCommercant> tarifCommercants = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parametrage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tarifReferenceOption", "parametrage" }, allowSetters = true)
    private Set<OptionProduitCommerces> optionProduitCommerces = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parametrage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "parametrage" }, allowSetters = true)
    private Set<Conformite> conformites = new HashSet<>();

    @JsonIgnoreProperties(value = { "parametrage", "crs", "offres", "produits" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "parametrage")
    private OffreProduit offreProduit;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Parametrage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Garantie getGarantie() {
        return this.garantie;
    }

    public void setGarantie(Garantie garantie) {
        this.garantie = garantie;
    }

    public Parametrage garantie(Garantie garantie) {
        this.setGarantie(garantie);
        return this;
    }

    public Set<Demande> getDemandes() {
        return this.demandes;
    }

    public void setDemandes(Set<Demande> demandes) {
        if (this.demandes != null) {
            this.demandes.forEach(i -> i.setParametrage(null));
        }
        if (demandes != null) {
            demandes.forEach(i -> i.setParametrage(this));
        }
        this.demandes = demandes;
    }

    public Parametrage demandes(Set<Demande> demandes) {
        this.setDemandes(demandes);
        return this;
    }

    public Parametrage addDemande(Demande demande) {
        this.demandes.add(demande);
        demande.setParametrage(this);
        return this;
    }

    public Parametrage removeDemande(Demande demande) {
        this.demandes.remove(demande);
        demande.setParametrage(null);
        return this;
    }

    public Set<TarifCommercant> getTarifCommercants() {
        return this.tarifCommercants;
    }

    public void setTarifCommercants(Set<TarifCommercant> tarifCommercants) {
        if (this.tarifCommercants != null) {
            this.tarifCommercants.forEach(i -> i.setParametrage(null));
        }
        if (tarifCommercants != null) {
            tarifCommercants.forEach(i -> i.setParametrage(this));
        }
        this.tarifCommercants = tarifCommercants;
    }

    public Parametrage tarifCommercants(Set<TarifCommercant> tarifCommercants) {
        this.setTarifCommercants(tarifCommercants);
        return this;
    }

    public Parametrage addTarifCommercant(TarifCommercant tarifCommercant) {
        this.tarifCommercants.add(tarifCommercant);
        tarifCommercant.setParametrage(this);
        return this;
    }

    public Parametrage removeTarifCommercant(TarifCommercant tarifCommercant) {
        this.tarifCommercants.remove(tarifCommercant);
        tarifCommercant.setParametrage(null);
        return this;
    }

    public Set<OptionProduitCommerces> getOptionProduitCommerces() {
        return this.optionProduitCommerces;
    }

    public void setOptionProduitCommerces(Set<OptionProduitCommerces> optionProduitCommerces) {
        if (this.optionProduitCommerces != null) {
            this.optionProduitCommerces.forEach(i -> i.setParametrage(null));
        }
        if (optionProduitCommerces != null) {
            optionProduitCommerces.forEach(i -> i.setParametrage(this));
        }
        this.optionProduitCommerces = optionProduitCommerces;
    }

    public Parametrage optionProduitCommerces(Set<OptionProduitCommerces> optionProduitCommerces) {
        this.setOptionProduitCommerces(optionProduitCommerces);
        return this;
    }

    public Parametrage addOptionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        this.optionProduitCommerces.add(optionProduitCommerces);
        optionProduitCommerces.setParametrage(this);
        return this;
    }

    public Parametrage removeOptionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        this.optionProduitCommerces.remove(optionProduitCommerces);
        optionProduitCommerces.setParametrage(null);
        return this;
    }

    public Set<Conformite> getConformites() {
        return this.conformites;
    }

    public void setConformites(Set<Conformite> conformites) {
        if (this.conformites != null) {
            this.conformites.forEach(i -> i.setParametrage(null));
        }
        if (conformites != null) {
            conformites.forEach(i -> i.setParametrage(this));
        }
        this.conformites = conformites;
    }

    public Parametrage conformites(Set<Conformite> conformites) {
        this.setConformites(conformites);
        return this;
    }

    public Parametrage addConformite(Conformite conformite) {
        this.conformites.add(conformite);
        conformite.setParametrage(this);
        return this;
    }

    public Parametrage removeConformite(Conformite conformite) {
        this.conformites.remove(conformite);
        conformite.setParametrage(null);
        return this;
    }

    public OffreProduit getOffreProduit() {
        return this.offreProduit;
    }

    public void setOffreProduit(OffreProduit offreProduit) {
        if (this.offreProduit != null) {
            this.offreProduit.setParametrage(null);
        }
        if (offreProduit != null) {
            offreProduit.setParametrage(this);
        }
        this.offreProduit = offreProduit;
    }

    public Parametrage offreProduit(OffreProduit offreProduit) {
        this.setOffreProduit(offreProduit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parametrage)) {
            return false;
        }
        return getId() != null && getId().equals(((Parametrage) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Parametrage{" +
            "id=" + getId() +
            "}";
    }
}
