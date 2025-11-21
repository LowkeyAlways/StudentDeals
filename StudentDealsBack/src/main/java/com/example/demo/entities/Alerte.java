package com.example.demo.entities;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alerte {
	
	@Id
	@GeneratedValue (strategy =  GenerationType.AUTO)
	private Long id_alerte;
	private Date date_alerte;

	@ManyToMany(mappedBy = "alertes")
	private Set<Utilisateur> utilisateurs;

}
