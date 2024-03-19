package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
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

    @JsonIgnoreProperties(
        value = { "garantie", "demande", "conformite", "tarifCommercants", "optionProduitCommerces", "offreProduit" },
        allowSetters = true
    )
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "conformite")
    private Parametrage parametrage;

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

    public Parametrage getParametrage() {
        return this.parametrage;
    }

    public void setParametrage(Parametrage parametrage) {
        if (this.parametrage != null) {
            this.parametrage.setConformite(null);
        }
        if (parametrage != null) {
            parametrage.setConformite(this);
        }
        this.parametrage = parametrage;
    }

    public Conformite parametrage(Parametrage parametrage) {
        this.setParametrage(parametrage);
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
