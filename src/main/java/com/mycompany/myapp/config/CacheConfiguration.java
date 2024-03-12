package com.mycompany.myapp.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mycompany.myapp.domain.User.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Authority.class.getName());
            createCache(cm, com.mycompany.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mycompany.myapp.domain.ReferentielCR.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ReferentielCR.class.getName() + ".crs");
            createCache(cm, com.mycompany.myapp.domain.Demande.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Demande.class.getName() + ".histModifDemandes");
            createCache(cm, com.mycompany.myapp.domain.HistModifDemande.class.getName());
            createCache(cm, com.mycompany.myapp.domain.CR.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Parametrage.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Parametrage.class.getName() + ".demandes");
            createCache(cm, com.mycompany.myapp.domain.Parametrage.class.getName() + ".tarifCommercants");
            createCache(cm, com.mycompany.myapp.domain.Parametrage.class.getName() + ".optionProduitCommerces");
            createCache(cm, com.mycompany.myapp.domain.Parametrage.class.getName() + ".conformites");
            createCache(cm, com.mycompany.myapp.domain.Offre.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Offre.class.getName() + ".offreProduits");
            createCache(cm, com.mycompany.myapp.domain.Produit.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Produit.class.getName() + ".offreProduits");
            createCache(cm, com.mycompany.myapp.domain.OffreProduit.class.getName());
            createCache(cm, com.mycompany.myapp.domain.OffreProduit.class.getName() + ".crs");
            createCache(cm, com.mycompany.myapp.domain.OffreProduit.class.getName() + ".offres");
            createCache(cm, com.mycompany.myapp.domain.OffreProduit.class.getName() + ".produits");
            createCache(cm, com.mycompany.myapp.domain.Garantie.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TarifCommercant.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Tarif.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Logiciel.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Fdo.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Option.class.getName());
            createCache(cm, com.mycompany.myapp.domain.AutreFrais.class.getName());
            createCache(cm, com.mycompany.myapp.domain.OptionProduitCommerces.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ReferenceOptionProduitCommerces.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ReferenceOptionProduitCommerces.class.getName() + ".tarifReferenceOptions");
            createCache(cm, com.mycompany.myapp.domain.TarifReferenceOption.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TarifReferenceOption.class.getName() + ".referenceOptionProduitCommerces");
            createCache(cm, com.mycompany.myapp.domain.Conformite.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Tpe.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
