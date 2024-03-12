package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Tpe.
 */
@Entity
@Table(name = "tpe")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tpe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "image_tpe")
    private String imageTpe;

    @Column(name = "descriptif")
    private String descriptif;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Tpe id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageTpe() {
        return this.imageTpe;
    }

    public Tpe imageTpe(String imageTpe) {
        this.setImageTpe(imageTpe);
        return this;
    }

    public void setImageTpe(String imageTpe) {
        this.imageTpe = imageTpe;
    }

    public String getDescriptif() {
        return this.descriptif;
    }

    public Tpe descriptif(String descriptif) {
        this.setDescriptif(descriptif);
        return this;
    }

    public void setDescriptif(String descriptif) {
        this.descriptif = descriptif;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tpe)) {
            return false;
        }
        return getId() != null && getId().equals(((Tpe) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tpe{" +
            "id=" + getId() +
            ", imageTpe='" + getImageTpe() + "'" +
            ", descriptif='" + getDescriptif() + "'" +
            "}";
    }
}
