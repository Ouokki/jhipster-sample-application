package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ReferenceOptionProduitCommerces.
 */
@Entity
@Table(name = "reference_option_produit_commerces")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReferenceOptionProduitCommerces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "code_option_produit")
    private String codeOptionProduit;

    @Column(name = "libelle_option_produit")
    private String libelleOptionProduit;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "referenceOptionProduitCommerces")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "referenceOptionProduitCommerces", "optionProduitCommerces" }, allowSetters = true)
    private Set<TarifReferenceOption> tarifReferenceOptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ReferenceOptionProduitCommerces id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeOptionProduit() {
        return this.codeOptionProduit;
    }

    public ReferenceOptionProduitCommerces codeOptionProduit(String codeOptionProduit) {
        this.setCodeOptionProduit(codeOptionProduit);
        return this;
    }

    public void setCodeOptionProduit(String codeOptionProduit) {
        this.codeOptionProduit = codeOptionProduit;
    }

    public String getLibelleOptionProduit() {
        return this.libelleOptionProduit;
    }

    public ReferenceOptionProduitCommerces libelleOptionProduit(String libelleOptionProduit) {
        this.setLibelleOptionProduit(libelleOptionProduit);
        return this;
    }

    public void setLibelleOptionProduit(String libelleOptionProduit) {
        this.libelleOptionProduit = libelleOptionProduit;
    }

    public Set<TarifReferenceOption> getTarifReferenceOptions() {
        return this.tarifReferenceOptions;
    }

    public void setTarifReferenceOptions(Set<TarifReferenceOption> tarifReferenceOptions) {
        if (this.tarifReferenceOptions != null) {
            this.tarifReferenceOptions.forEach(i -> i.removeReferenceOptionProduitCommerces(this));
        }
        if (tarifReferenceOptions != null) {
            tarifReferenceOptions.forEach(i -> i.addReferenceOptionProduitCommerces(this));
        }
        this.tarifReferenceOptions = tarifReferenceOptions;
    }

    public ReferenceOptionProduitCommerces tarifReferenceOptions(Set<TarifReferenceOption> tarifReferenceOptions) {
        this.setTarifReferenceOptions(tarifReferenceOptions);
        return this;
    }

    public ReferenceOptionProduitCommerces addTarifReferenceOption(TarifReferenceOption tarifReferenceOption) {
        this.tarifReferenceOptions.add(tarifReferenceOption);
        tarifReferenceOption.getReferenceOptionProduitCommerces().add(this);
        return this;
    }

    public ReferenceOptionProduitCommerces removeTarifReferenceOption(TarifReferenceOption tarifReferenceOption) {
        this.tarifReferenceOptions.remove(tarifReferenceOption);
        tarifReferenceOption.getReferenceOptionProduitCommerces().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReferenceOptionProduitCommerces)) {
            return false;
        }
        return getId() != null && getId().equals(((ReferenceOptionProduitCommerces) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReferenceOptionProduitCommerces{" +
            "id=" + getId() +
            ", codeOptionProduit='" + getCodeOptionProduit() + "'" +
            ", libelleOptionProduit='" + getLibelleOptionProduit() + "'" +
            "}";
    }
}
