package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OptionProduitCommerces.
 */
@Entity
@Table(name = "option_produit_commerces")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OptionProduitCommerces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @JsonIgnoreProperties(value = { "referenceOptionProduitCommerces", "optionProduitCommerces" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private TarifReferenceOption tarifReferenceOption;

    @JsonIgnoreProperties(value = { "tarifCommercant", "optionProduitCommerces" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Tarif tarif;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = { "garantie", "demande", "conformite", "tarifCommercants", "optionProduitCommerces", "offreProduit" },
        allowSetters = true
    )
    private Parametrage parametrage;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public OptionProduitCommerces id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TarifReferenceOption getTarifReferenceOption() {
        return this.tarifReferenceOption;
    }

    public void setTarifReferenceOption(TarifReferenceOption tarifReferenceOption) {
        this.tarifReferenceOption = tarifReferenceOption;
    }

    public OptionProduitCommerces tarifReferenceOption(TarifReferenceOption tarifReferenceOption) {
        this.setTarifReferenceOption(tarifReferenceOption);
        return this;
    }

    public Tarif getTarif() {
        return this.tarif;
    }

    public void setTarif(Tarif tarif) {
        this.tarif = tarif;
    }

    public OptionProduitCommerces tarif(Tarif tarif) {
        this.setTarif(tarif);
        return this;
    }

    public Parametrage getParametrage() {
        return this.parametrage;
    }

    public void setParametrage(Parametrage parametrage) {
        this.parametrage = parametrage;
    }

    public OptionProduitCommerces parametrage(Parametrage parametrage) {
        this.setParametrage(parametrage);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OptionProduitCommerces)) {
            return false;
        }
        return getId() != null && getId().equals(((OptionProduitCommerces) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OptionProduitCommerces{" +
            "id=" + getId() +
            "}";
    }
}
