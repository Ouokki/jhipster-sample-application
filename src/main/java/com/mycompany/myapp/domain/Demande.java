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

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "demandes" }, allowSetters = true)
    private HistModifDemande histModifDemande;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "demande")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "garantie", "demande", "tarifCommercant", "optionProduitCommerces", "conformite", "offreProduit" },
        allowSetters = true
    )
    private Set<Parametrage> parametrages = new HashSet<>();

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

    public HistModifDemande getHistModifDemande() {
        return this.histModifDemande;
    }

    public void setHistModifDemande(HistModifDemande histModifDemande) {
        this.histModifDemande = histModifDemande;
    }

    public Demande histModifDemande(HistModifDemande histModifDemande) {
        this.setHistModifDemande(histModifDemande);
        return this;
    }

    public Set<Parametrage> getParametrages() {
        return this.parametrages;
    }

    public void setParametrages(Set<Parametrage> parametrages) {
        if (this.parametrages != null) {
            this.parametrages.forEach(i -> i.setDemande(null));
        }
        if (parametrages != null) {
            parametrages.forEach(i -> i.setDemande(this));
        }
        this.parametrages = parametrages;
    }

    public Demande parametrages(Set<Parametrage> parametrages) {
        this.setParametrages(parametrages);
        return this;
    }

    public Demande addParametrage(Parametrage parametrage) {
        this.parametrages.add(parametrage);
        parametrage.setDemande(this);
        return this;
    }

    public Demande removeParametrage(Parametrage parametrage) {
        this.parametrages.remove(parametrage);
        parametrage.setDemande(null);
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
