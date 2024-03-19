package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ReferentielCR.
 */
@Entity
@Table(name = "referentiel_cr")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReferentielCR implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nom_cr")
    private String nomCR;

    @Column(name = "numero_cr")
    private String numeroCR;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "referentielCR")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "offreProduits", "referentielCR" }, allowSetters = true)
    private Set<CR> crs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ReferentielCR id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomCR() {
        return this.nomCR;
    }

    public ReferentielCR nomCR(String nomCR) {
        this.setNomCR(nomCR);
        return this;
    }

    public void setNomCR(String nomCR) {
        this.nomCR = nomCR;
    }

    public String getNumeroCR() {
        return this.numeroCR;
    }

    public ReferentielCR numeroCR(String numeroCR) {
        this.setNumeroCR(numeroCR);
        return this;
    }

    public void setNumeroCR(String numeroCR) {
        this.numeroCR = numeroCR;
    }

    public Set<CR> getCrs() {
        return this.crs;
    }

    public void setCrs(Set<CR> cRS) {
        if (this.crs != null) {
            this.crs.forEach(i -> i.setReferentielCR(null));
        }
        if (cRS != null) {
            cRS.forEach(i -> i.setReferentielCR(this));
        }
        this.crs = cRS;
    }

    public ReferentielCR crs(Set<CR> cRS) {
        this.setCrs(cRS);
        return this;
    }

    public ReferentielCR addCr(CR cR) {
        this.crs.add(cR);
        cR.setReferentielCR(this);
        return this;
    }

    public ReferentielCR removeCr(CR cR) {
        this.crs.remove(cR);
        cR.setReferentielCR(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReferentielCR)) {
            return false;
        }
        return getId() != null && getId().equals(((ReferentielCR) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReferentielCR{" +
            "id=" + getId() +
            ", nomCR='" + getNomCR() + "'" +
            ", numeroCR='" + getNumeroCR() + "'" +
            "}";
    }
}
