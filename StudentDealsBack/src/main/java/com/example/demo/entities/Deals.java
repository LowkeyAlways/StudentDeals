package com.example.demo.entities;

import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Deals {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_deals;

    private String titre;
    private String description;

    @ManyToMany(mappedBy = "dealsPublies")
    private Set<Utilisateur> utilisateurs;

    @ManyToOne
    @JoinColumn(name = "id_categorie")
    private Categories categorie;
}
