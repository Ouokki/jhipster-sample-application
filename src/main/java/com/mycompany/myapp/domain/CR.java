package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CR.
 */
@Entity
@Table(name = "cr")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CR implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "is_avem")
    private Boolean isAvem;

    @Column(name = "is_amex")
    private Boolean isAmex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "crs" }, allowSetters = true)
    private ReferentielCR referentielCR;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "parametrage", "crs", "offres", "produits" }, allowSetters = true)
    private OffreProduit offreProduit;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CR id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsAvem() {
        return this.isAvem;
    }

    public CR isAvem(Boolean isAvem) {
        this.setIsAvem(isAvem);
        return this;
    }

    public void setIsAvem(Boolean isAvem) {
        this.isAvem = isAvem;
    }

    public Boolean getIsAmex() {
        return this.isAmex;
    }

    public CR isAmex(Boolean isAmex) {
        this.setIsAmex(isAmex);
        return this;
    }

    public void setIsAmex(Boolean isAmex) {
        this.isAmex = isAmex;
    }

    public ReferentielCR getReferentielCR() {
        return this.referentielCR;
    }

    public void setReferentielCR(ReferentielCR referentielCR) {
        this.referentielCR = referentielCR;
    }

    public CR referentielCR(ReferentielCR referentielCR) {
        this.setReferentielCR(referentielCR);
        return this;
    }

    public OffreProduit getOffreProduit() {
        return this.offreProduit;
    }

    public void setOffreProduit(OffreProduit offreProduit) {
        this.offreProduit = offreProduit;
    }

    public CR offreProduit(OffreProduit offreProduit) {
        this.setOffreProduit(offreProduit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CR)) {
            return false;
        }
        return getId() != null && getId().equals(((CR) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CR{" +
            "id=" + getId() +
            ", isAvem='" + getIsAvem() + "'" +
            ", isAmex='" + getIsAmex() + "'" +
            "}";
    }
}
