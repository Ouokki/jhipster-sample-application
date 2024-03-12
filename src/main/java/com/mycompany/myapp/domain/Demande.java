package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Demande.
 */
@Entity
@Table(name = "demande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Demande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date_demande")
    private Instant dateDemande;

    @Column(name = "validiation")
    private Boolean validiation;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "demande")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "demande" }, allowSetters = true)
    private Set<HistModifDemande> histModifDemandes = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = { "garantie", "demandes", "tarifCommercants", "optionProduitCommerces", "conformites", "offreProduit" },
        allowSetters = true
    )
    private Parametrage parametrage;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Demande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateDemande() {
        return this.dateDemande;
    }

    public Demande dateDemande(Instant dateDemande) {
        this.setDateDemande(dateDemande);
        return this;
    }

    public void setDateDemande(Instant dateDemande) {
        this.dateDemande = dateDemande;
    }

    public Boolean getValidiation() {
        return this.validiation;
    }

    public Demande validiation(Boolean validiation) {
        this.setValidiation(validiation);
        return this;
    }

    public void setValidiation(Boolean validiation) {
        this.validiation = validiation;
    }

    public Set<HistModifDemande> getHistModifDemandes() {
        return this.histModifDemandes;
    }

    public void setHistModifDemandes(Set<HistModifDemande> histModifDemandes) {
        if (this.histModifDemandes != null) {
            this.histModifDemandes.forEach(i -> i.setDemande(null));
        }
        if (histModifDemandes != null) {
            histModifDemandes.forEach(i -> i.setDemande(this));
        }
        this.histModifDemandes = histModifDemandes;
    }

    public Demande histModifDemandes(Set<HistModifDemande> histModifDemandes) {
        this.setHistModifDemandes(histModifDemandes);
        return this;
    }

    public Demande addHistModifDemande(HistModifDemande histModifDemande) {
        this.histModifDemandes.add(histModifDemande);
        histModifDemande.setDemande(this);
        return this;
    }

    public Demande removeHistModifDemande(HistModifDemande histModifDemande) {
        this.histModifDemandes.remove(histModifDemande);
        histModifDemande.setDemande(null);
        return this;
    }

    public Parametrage getParametrage() {
        return this.parametrage;
    }

    public void setParametrage(Parametrage parametrage) {
        this.parametrage = parametrage;
    }

    public Demande parametrage(Parametrage parametrage) {
        this.setParametrage(parametrage);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Demande)) {
            return false;
        }
        return getId() != null && getId().equals(((Demande) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Demande{" +
            "id=" + getId() +
            ", dateDemande='" + getDateDemande() + "'" +
            ", validiation='" + getValidiation() + "'" +
            "}";
    }
}
