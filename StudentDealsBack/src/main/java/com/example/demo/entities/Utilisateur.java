package com.example.demo.entities;

import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUtilisateur;

    private String nomUtilisateur;
    private String prenomUtilisateur;
    private String adresseMail;
    private String motDePasse;

    @Enumerated(EnumType.STRING)
    private Branche branche;

    public enum Branche {
        Ressource_humaine,
        Informatique_dev,
        Informatique_infra,
        Marketing,
        Communication
    }
    @ManyToMany
    @JoinTable(
            name = "utilisateur_alerte",
            joinColumns = @JoinColumn(name = "id_utilisateur"),
            inverseJoinColumns = @JoinColumn(name = "id_alerte")
    )
    private Set<Alerte> alertes;

    @ManyToMany
    @JoinTable(
            name = "utilisateur_deals",
            joinColumns = @JoinColumn(name = "id_utilisateur"),
            inverseJoinColumns = @JoinColumn(name = "id_deals")
    )
    private Set<Deals> dealsPublies;

}
