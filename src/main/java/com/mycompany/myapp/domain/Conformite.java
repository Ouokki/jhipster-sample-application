package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Conformite.
 */
@Entity
@Table(name = "conformite")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Conformite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "affichage")
    private Boolean affichage;

    @Column(name = "lien_bonita")
    private String lienBonita;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "conformite")
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

    public Conformite id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getAffichage() {
        return this.affichage;
    }

    public Conformite affichage(Boolean affichage) {
        this.setAffichage(affichage);
        return this;
    }

    public void setAffichage(Boolean affichage) {
        this.affichage = affichage;
    }

    public String getLienBonita() {
        return this.lienBonita;
    }

    public Conformite lienBonita(String lienBonita) {
        this.setLienBonita(lienBonita);
        return this;
    }

    public void setLienBonita(String lienBonita) {
        this.lienBonita = lienBonita;
    }

    public Set<Parametrage> getParametrages() {
        return this.parametrages;
    }

    public void setParametrages(Set<Parametrage> parametrages) {
        if (this.parametrages != null) {
            this.parametrages.forEach(i -> i.setConformite(null));
        }
        if (parametrages != null) {
            parametrages.forEach(i -> i.setConformite(this));
        }
        this.parametrages = parametrages;
    }

    public Conformite parametrages(Set<Parametrage> parametrages) {
        this.setParametrages(parametrages);
        return this;
    }

    public Conformite addParametrage(Parametrage parametrage) {
        this.parametrages.add(parametrage);
        parametrage.setConformite(this);
        return this;
    }

    public Conformite removeParametrage(Parametrage parametrage) {
        this.parametrages.remove(parametrage);
        parametrage.setConformite(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conformite)) {
            return false;
        }
        return getId() != null && getId().equals(((Conformite) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Conformite{" +
            "id=" + getId() +
            ", affichage='" + getAffichage() + "'" +
            ", lienBonita='" + getLienBonita() + "'" +
            "}";
    }
}
