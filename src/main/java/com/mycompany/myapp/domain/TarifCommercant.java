package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeCommissionCommercant;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A TarifCommercant.
 */
@Entity
@Table(name = "tarif_commercant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TarifCommercant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_commission")
    private TypeCommissionCommercant typeCommission;

    @JsonIgnoreProperties(value = { "tarifReferenceOption", "tarifCommercant" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Tarif tarif;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tarifCommercant")
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

    public TarifCommercant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TypeCommissionCommercant getTypeCommission() {
        return this.typeCommission;
    }

    public TarifCommercant typeCommission(TypeCommissionCommercant typeCommission) {
        this.setTypeCommission(typeCommission);
        return this;
    }

    public void setTypeCommission(TypeCommissionCommercant typeCommission) {
        this.typeCommission = typeCommission;
    }

    public Tarif getTarif() {
        return this.tarif;
    }

    public void setTarif(Tarif tarif) {
        this.tarif = tarif;
    }

    public TarifCommercant tarif(Tarif tarif) {
        this.setTarif(tarif);
        return this;
    }

    public Set<Parametrage> getParametrages() {
        return this.parametrages;
    }

    public void setParametrages(Set<Parametrage> parametrages) {
        if (this.parametrages != null) {
            this.parametrages.forEach(i -> i.setTarifCommercant(null));
        }
        if (parametrages != null) {
            parametrages.forEach(i -> i.setTarifCommercant(this));
        }
        this.parametrages = parametrages;
    }

    public TarifCommercant parametrages(Set<Parametrage> parametrages) {
        this.setParametrages(parametrages);
        return this;
    }

    public TarifCommercant addParametrage(Parametrage parametrage) {
        this.parametrages.add(parametrage);
        parametrage.setTarifCommercant(this);
        return this;
    }

    public TarifCommercant removeParametrage(Parametrage parametrage) {
        this.parametrages.remove(parametrage);
        parametrage.setTarifCommercant(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TarifCommercant)) {
            return false;
        }
        return getId() != null && getId().equals(((TarifCommercant) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TarifCommercant{" +
            "id=" + getId() +
            ", typeCommission='" + getTypeCommission() + "'" +
            "}";
    }
}
