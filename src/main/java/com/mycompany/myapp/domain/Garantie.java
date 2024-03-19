package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Garantie.
 */
@Entity
@Table(name = "garantie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Garantie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "montant_autorisation_transaction")
    private String montantAutorisationTransaction;

    @Column(name = "montant_autorisation_tpe")
    private String montantAutorisationTPE;

    @Column(name = "delai_remise")
    private String delaiRemise;

    @Column(name = "delai_communication_justificatif")
    private String delaiCommunicationJustificatif;

    @JsonIgnoreProperties(
        value = { "garantie", "demande", "conformite", "tarifCommercants", "optionProduitCommerces", "offreProduit" },
        allowSetters = true
    )
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "garantie")
    private Parametrage parametrage;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Garantie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMontantAutorisationTransaction() {
        return this.montantAutorisationTransaction;
    }

    public Garantie montantAutorisationTransaction(String montantAutorisationTransaction) {
        this.setMontantAutorisationTransaction(montantAutorisationTransaction);
        return this;
    }

    public void setMontantAutorisationTransaction(String montantAutorisationTransaction) {
        this.montantAutorisationTransaction = montantAutorisationTransaction;
    }

    public String getMontantAutorisationTPE() {
        return this.montantAutorisationTPE;
    }

    public Garantie montantAutorisationTPE(String montantAutorisationTPE) {
        this.setMontantAutorisationTPE(montantAutorisationTPE);
        return this;
    }

    public void setMontantAutorisationTPE(String montantAutorisationTPE) {
        this.montantAutorisationTPE = montantAutorisationTPE;
    }

    public String getDelaiRemise() {
        return this.delaiRemise;
    }

    public Garantie delaiRemise(String delaiRemise) {
        this.setDelaiRemise(delaiRemise);
        return this;
    }

    public void setDelaiRemise(String delaiRemise) {
        this.delaiRemise = delaiRemise;
    }

    public String getDelaiCommunicationJustificatif() {
        return this.delaiCommunicationJustificatif;
    }

    public Garantie delaiCommunicationJustificatif(String delaiCommunicationJustificatif) {
        this.setDelaiCommunicationJustificatif(delaiCommunicationJustificatif);
        return this;
    }

    public void setDelaiCommunicationJustificatif(String delaiCommunicationJustificatif) {
        this.delaiCommunicationJustificatif = delaiCommunicationJustificatif;
    }

    public Parametrage getParametrage() {
        return this.parametrage;
    }

    public void setParametrage(Parametrage parametrage) {
        if (this.parametrage != null) {
            this.parametrage.setGarantie(null);
        }
        if (parametrage != null) {
            parametrage.setGarantie(this);
        }
        this.parametrage = parametrage;
    }

    public Garantie parametrage(Parametrage parametrage) {
        this.setParametrage(parametrage);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Garantie)) {
            return false;
        }
        return getId() != null && getId().equals(((Garantie) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Garantie{" +
            "id=" + getId() +
            ", montantAutorisationTransaction='" + getMontantAutorisationTransaction() + "'" +
            ", montantAutorisationTPE='" + getMontantAutorisationTPE() + "'" +
            ", delaiRemise='" + getDelaiRemise() + "'" +
            ", delaiCommunicationJustificatif='" + getDelaiCommunicationJustificatif() + "'" +
            "}";
    }
}
