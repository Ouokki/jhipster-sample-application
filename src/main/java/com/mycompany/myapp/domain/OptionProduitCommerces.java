package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
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

    @JsonIgnoreProperties(value = { "referenceOptionProduitCommerces", "optionProduitCommerces", "tarif" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private TarifReferenceOption tarifReferenceOption;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "optionProduitCommerces")
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

    public Set<Parametrage> getParametrages() {
        return this.parametrages;
    }

    public void setParametrages(Set<Parametrage> parametrages) {
        if (this.parametrages != null) {
            this.parametrages.forEach(i -> i.setOptionProduitCommerces(null));
        }
        if (parametrages != null) {
            parametrages.forEach(i -> i.setOptionProduitCommerces(this));
        }
        this.parametrages = parametrages;
    }

    public OptionProduitCommerces parametrages(Set<Parametrage> parametrages) {
        this.setParametrages(parametrages);
        return this;
    }

    public OptionProduitCommerces addParametrage(Parametrage parametrage) {
        this.parametrages.add(parametrage);
        parametrage.setOptionProduitCommerces(this);
        return this;
    }

    public OptionProduitCommerces removeParametrage(Parametrage parametrage) {
        this.parametrages.remove(parametrage);
        parametrage.setOptionProduitCommerces(null);
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
