package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TarifReferenceOption.
 */
@Entity
@Table(name = "tarif_reference_option")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TarifReferenceOption implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "trigramme")
    private String trigramme;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_tarif_reference_option__reference_option_produit_commerces",
        joinColumns = @JoinColumn(name = "tarif_reference_option_id"),
        inverseJoinColumns = @JoinColumn(name = "reference_option_produit_commerces_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tarifReferenceOptions" }, allowSetters = true)
    private Set<ReferenceOptionProduitCommerces> referenceOptionProduitCommerces = new HashSet<>();

    @JsonIgnoreProperties(value = { "tarifReferenceOption", "parametrage" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "tarifReferenceOption")
    private OptionProduitCommerces optionProduitCommerces;

    @JsonIgnoreProperties(value = { "tarifReferenceOption", "tarifCommercant" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "tarifReferenceOption")
    private Tarif tarif;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TarifReferenceOption id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrigramme() {
        return this.trigramme;
    }

    public TarifReferenceOption trigramme(String trigramme) {
        this.setTrigramme(trigramme);
        return this;
    }

    public void setTrigramme(String trigramme) {
        this.trigramme = trigramme;
    }

    public Set<ReferenceOptionProduitCommerces> getReferenceOptionProduitCommerces() {
        return this.referenceOptionProduitCommerces;
    }

    public void setReferenceOptionProduitCommerces(Set<ReferenceOptionProduitCommerces> referenceOptionProduitCommerces) {
        this.referenceOptionProduitCommerces = referenceOptionProduitCommerces;
    }

    public TarifReferenceOption referenceOptionProduitCommerces(Set<ReferenceOptionProduitCommerces> referenceOptionProduitCommerces) {
        this.setReferenceOptionProduitCommerces(referenceOptionProduitCommerces);
        return this;
    }

    public TarifReferenceOption addReferenceOptionProduitCommerces(ReferenceOptionProduitCommerces referenceOptionProduitCommerces) {
        this.referenceOptionProduitCommerces.add(referenceOptionProduitCommerces);
        return this;
    }

    public TarifReferenceOption removeReferenceOptionProduitCommerces(ReferenceOptionProduitCommerces referenceOptionProduitCommerces) {
        this.referenceOptionProduitCommerces.remove(referenceOptionProduitCommerces);
        return this;
    }

    public OptionProduitCommerces getOptionProduitCommerces() {
        return this.optionProduitCommerces;
    }

    public void setOptionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        if (this.optionProduitCommerces != null) {
            this.optionProduitCommerces.setTarifReferenceOption(null);
        }
        if (optionProduitCommerces != null) {
            optionProduitCommerces.setTarifReferenceOption(this);
        }
        this.optionProduitCommerces = optionProduitCommerces;
    }

    public TarifReferenceOption optionProduitCommerces(OptionProduitCommerces optionProduitCommerces) {
        this.setOptionProduitCommerces(optionProduitCommerces);
        return this;
    }

    public Tarif getTarif() {
        return this.tarif;
    }

    public void setTarif(Tarif tarif) {
        if (this.tarif != null) {
            this.tarif.setTarifReferenceOption(null);
        }
        if (tarif != null) {
            tarif.setTarifReferenceOption(this);
        }
        this.tarif = tarif;
    }

    public TarifReferenceOption tarif(Tarif tarif) {
        this.setTarif(tarif);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TarifReferenceOption)) {
            return false;
        }
        return getId() != null && getId().equals(((TarifReferenceOption) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TarifReferenceOption{" +
            "id=" + getId() +
            ", trigramme='" + getTrigramme() + "'" +
            "}";
    }
}
