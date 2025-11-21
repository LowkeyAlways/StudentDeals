package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entities.Categories;

public interface CategorieRepository extends JpaRepository<Categories, Long> {

	// Use an explicit JPQL query to avoid Spring Data method-name parsing problems
	@Query("SELECT c FROM Categories c WHERE c.categorie_deals = :val")
	Categories findByCategorieDeals(@Param("val") Categories.categorie_deals val);

}
