package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "histModifDemande", "parametrages" }, allowSetters = true)
    private Demande demande;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "tarif", "parametrages" }, allowSetters = true)
    private TarifCommercant tarifCommercant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "tarifReferenceOption", "parametrages" }, allowSetters = true)
    private OptionProduitCommerces optionProduitCommerces;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "parametrages" }, allowSetters = true)
    private Conformite conformite;

    @JsonIgnoreProperties(value = { "parametrage", "cr", "offres", "produits" }, allowSetters = true)
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

    public Demande getDemande() {
        return this.demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    public Parametrage demande(Demande demande) {
        this.setDemande(demande);
        return this;
    }

    public TarifCommercant getTarifCommercant() {
        return this.tarifCommercant;
    }

    public void setTarifCommercant(TarifCommercant tarifCommercant) {
        this.tarifCommercant = tarifCommercant;
    }

    public Parametrage tarifCommercant(TarifCommercant tarifCommercant) {
        this.setTarifCommercant(tarifCommercant);
        return this;
    }

    public OptionProduitCommerces getOptionProduitCommerces() {
        return this.optionProduitCommerces;
    }

    public void setOptionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        this.optionProduitCommerces = optionProduitCommerces;
    }

    public Parametrage optionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        this.setOptionProduitCommerces(optionProduitCommerces);
        return this;
    }

    public Conformite getConformite() {
        return this.conformite;
    }

    public void setConformite(Conformite conformite) {
        this.conformite = conformite;
    }

    public Parametrage conformite(Conformite conformite) {
        this.setConformite(conformite);
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
