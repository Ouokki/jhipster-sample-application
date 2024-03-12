package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A HistModifDemande.
 */
@Entity
@Table(name = "hist_modif_demande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HistModifDemande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "date_modification")
    private Instant dateModification;

    @Column(name = "type_modification")
    private String typeModification;

    @Column(name = "details_modifications")
    private String detailsModifications;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "histModifDemandes", "parametrage" }, allowSetters = true)
    private Demande demande;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HistModifDemande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateModification() {
        return this.dateModification;
    }

    public HistModifDemande dateModification(Instant dateModification) {
        this.setDateModification(dateModification);
        return this;
    }

    public void setDateModification(Instant dateModification) {
        this.dateModification = dateModification;
    }

    public String getTypeModification() {
        return this.typeModification;
    }

    public HistModifDemande typeModification(String typeModification) {
        this.setTypeModification(typeModification);
        return this;
    }

    public void setTypeModification(String typeModification) {
        this.typeModification = typeModification;
    }

    public String getDetailsModifications() {
        return this.detailsModifications;
    }

    public HistModifDemande detailsModifications(String detailsModifications) {
        this.setDetailsModifications(detailsModifications);
        return this;
    }

    public void setDetailsModifications(String detailsModifications) {
        this.detailsModifications = detailsModifications;
    }

    public Demande getDemande() {
        return this.demande;
    }

    public void setDemande(Demande demande) {
        this.demande = demande;
    }

    public HistModifDemande demande(Demande demande) {
        this.setDemande(demande);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistModifDemande)) {
            return false;
        }
        return getId() != null && getId().equals(((HistModifDemande) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistModifDemande{" +
            "id=" + getId() +
            ", dateModification='" + getDateModification() + "'" +
            ", typeModification='" + getTypeModification() + "'" +
            ", detailsModifications='" + getDetailsModifications() + "'" +
            "}";
    }
}
