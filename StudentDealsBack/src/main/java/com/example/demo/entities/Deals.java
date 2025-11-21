package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(length = 255)
    private String titre;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 1024)
    private String url;

    @ManyToMany(mappedBy = "dealsPublies")
    @JsonIgnore
    private Set<Utilisateur> utilisateurs;

    @ManyToOne
    @JoinColumn(name = "id_categorie")
    private Categories categorie;
}
