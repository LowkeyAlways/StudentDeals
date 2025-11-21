package com.example.demo.entities;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Categories {
	
	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private Long id_categorie;
	private categorie_deals categorie_deals;
	
	public enum categorie_deals{
		
				vacances,
				high_tech,
				logement,
				etudes,
				formation,
				jobs,
				humanitaire,
		
	}
	@OneToMany(mappedBy = "categorie")
	private Set<Deals> deals;

}
