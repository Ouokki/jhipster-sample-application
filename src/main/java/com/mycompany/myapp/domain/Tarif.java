package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Tarif.
 */
@Entity
@Table(name = "tarif")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tarif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tarif_par_defaut")
    private String tarifParDefaut;

    @Column(name = "tarif_minimum")
    private String tarifMinimum;

    @Column(name = "tarif_maximum")
    private String tarifMaximum;

    @Column(name = "unite")
    private String unite;

    @JsonIgnoreProperties(value = { "tarif", "parametrage" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "tarif")
    private TarifCommercant tarifCommercant;

    @JsonIgnoreProperties(value = { "tarifReferenceOption", "tarif", "parametrage" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "tarif")
    private OptionProduitCommerces optionProduitCommerces;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tarif id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTarifParDefaut() {
        return this.tarifParDefaut;
    }

    public Tarif tarifParDefaut(String tarifParDefaut) {
        this.setTarifParDefaut(tarifParDefaut);
        return this;
    }

    public void setTarifParDefaut(String tarifParDefaut) {
        this.tarifParDefaut = tarifParDefaut;
    }

    public String getTarifMinimum() {
        return this.tarifMinimum;
    }

    public Tarif tarifMinimum(String tarifMinimum) {
        this.setTarifMinimum(tarifMinimum);
        return this;
    }

    public void setTarifMinimum(String tarifMinimum) {
        this.tarifMinimum = tarifMinimum;
    }

    public String getTarifMaximum() {
        return this.tarifMaximum;
    }

    public Tarif tarifMaximum(String tarifMaximum) {
        this.setTarifMaximum(tarifMaximum);
        return this;
    }

    public void setTarifMaximum(String tarifMaximum) {
        this.tarifMaximum = tarifMaximum;
    }

    public String getUnite() {
        return this.unite;
    }

    public Tarif unite(String unite) {
        this.setUnite(unite);
        return this;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }

    public TarifCommercant getTarifCommercant() {
        return this.tarifCommercant;
    }

    public void setTarifCommercant(TarifCommercant tarifCommercant) {
        if (this.tarifCommercant != null) {
            this.tarifCommercant.setTarif(null);
        }
        if (tarifCommercant != null) {
            tarifCommercant.setTarif(this);
        }
        this.tarifCommercant = tarifCommercant;
    }

    public Tarif tarifCommercant(TarifCommercant tarifCommercant) {
        this.setTarifCommercant(tarifCommercant);
        return this;
    }

    public OptionProduitCommerces getOptionProduitCommerces() {
        return this.optionProduitCommerces;
    }

    public void setOptionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        if (this.optionProduitCommerces != null) {
            this.optionProduitCommerces.setTarif(null);
        }
        if (optionProduitCommerces != null) {
            optionProduitCommerces.setTarif(this);
        }
        this.optionProduitCommerces = optionProduitCommerces;
    }

    public Tarif optionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        this.setOptionProduitCommerces(optionProduitCommerces);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tarif)) {
            return false;
        }
        return getId() != null && getId().equals(((Tarif) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tarif{" +
            "id=" + getId() +
            ", tarifParDefaut='" + getTarifParDefaut() + "'" +
            ", tarifMinimum='" + getTarifMinimum() + "'" +
            ", tarifMaximum='" + getTarifMaximum() + "'" +
            ", unite='" + getUnite() + "'" +
            "}";
    }
}
