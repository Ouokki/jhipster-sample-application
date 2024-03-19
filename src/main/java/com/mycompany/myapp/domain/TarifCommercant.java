package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeCommissionCommercant;
import jakarta.persistence.*;
import java.io.Serializable;
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

    @Column(name = "nom_commission")
    private String nomCommission;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_commission")
    private TypeCommissionCommercant typeCommission;

    @Column(name = "champ_matrice")
    private String champMatrice;

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

    public TarifCommercant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomCommission() {
        return this.nomCommission;
    }

    public TarifCommercant nomCommission(String nomCommission) {
        this.setNomCommission(nomCommission);
        return this;
    }

    public void setNomCommission(String nomCommission) {
        this.nomCommission = nomCommission;
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

    public String getChampMatrice() {
        return this.champMatrice;
    }

    public TarifCommercant champMatrice(String champMatrice) {
        this.setChampMatrice(champMatrice);
        return this;
    }

    public void setChampMatrice(String champMatrice) {
        this.champMatrice = champMatrice;
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

    public Parametrage getParametrage() {
        return this.parametrage;
    }

    public void setParametrage(Parametrage parametrage) {
        this.parametrage = parametrage;
    }

    public TarifCommercant parametrage(Parametrage parametrage) {
        this.setParametrage(parametrage);
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
            ", nomCommission='" + getNomCommission() + "'" +
            ", typeCommission='" + getTypeCommission() + "'" +
            ", champMatrice='" + getChampMatrice() + "'" +
            "}";
    }
}
