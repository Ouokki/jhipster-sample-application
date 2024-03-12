package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Offre.
 */
@Entity
@Table(name = "offre")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Offre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "code_offre")
    private String codeOffre;

    @Column(name = "libelle_offre")
    private String libelleOffre;

    @Column(name = "reference_echange_avem")
    private String referenceEchangeAVEM;

    @Column(name = "reference_echange_caps")
    private String referenceEchangeCAPS;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "offres")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "parametrage", "cr", "offres", "produits" }, allowSetters = true)
    private Set<OffreProduit> offreProduits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Offre id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeOffre() {
        return this.codeOffre;
    }

    public Offre codeOffre(String codeOffre) {
        this.setCodeOffre(codeOffre);
        return this;
    }

    public void setCodeOffre(String codeOffre) {
        this.codeOffre = codeOffre;
    }

    public String getLibelleOffre() {
        return this.libelleOffre;
    }

    public Offre libelleOffre(String libelleOffre) {
        this.setLibelleOffre(libelleOffre);
        return this;
    }

    public void setLibelleOffre(String libelleOffre) {
        this.libelleOffre = libelleOffre;
    }

    public String getReferenceEchangeAVEM() {
        return this.referenceEchangeAVEM;
    }

    public Offre referenceEchangeAVEM(String referenceEchangeAVEM) {
        this.setReferenceEchangeAVEM(referenceEchangeAVEM);
        return this;
    }

    public void setReferenceEchangeAVEM(String referenceEchangeAVEM) {
        this.referenceEchangeAVEM = referenceEchangeAVEM;
    }

    public String getReferenceEchangeCAPS() {
        return this.referenceEchangeCAPS;
    }

    public Offre referenceEchangeCAPS(String referenceEchangeCAPS) {
        this.setReferenceEchangeCAPS(referenceEchangeCAPS);
        return this;
    }

    public void setReferenceEchangeCAPS(String referenceEchangeCAPS) {
        this.referenceEchangeCAPS = referenceEchangeCAPS;
    }

    public Set<OffreProduit> getOffreProduits() {
        return this.offreProduits;
    }

    public void setOffreProduits(Set<OffreProduit> offreProduits) {
        if (this.offreProduits != null) {
            this.offreProduits.forEach(i -> i.removeOffre(this));
        }
        if (offreProduits != null) {
            offreProduits.forEach(i -> i.addOffre(this));
        }
        this.offreProduits = offreProduits;
    }

    public Offre offreProduits(Set<OffreProduit> offreProduits) {
        this.setOffreProduits(offreProduits);
        return this;
    }

    public Offre addOffreProduit(OffreProduit offreProduit) {
        this.offreProduits.add(offreProduit);
        offreProduit.getOffres().add(this);
        return this;
    }

    public Offre removeOffreProduit(OffreProduit offreProduit) {
        this.offreProduits.remove(offreProduit);
        offreProduit.getOffres().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Offre)) {
            return false;
        }
        return getId() != null && getId().equals(((Offre) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Offre{" +
            "id=" + getId() +
            ", codeOffre='" + getCodeOffre() + "'" +
            ", libelleOffre='" + getLibelleOffre() + "'" +
            ", referenceEchangeAVEM='" + getReferenceEchangeAVEM() + "'" +
            ", referenceEchangeCAPS='" + getReferenceEchangeCAPS() + "'" +
            "}";
    }
}
