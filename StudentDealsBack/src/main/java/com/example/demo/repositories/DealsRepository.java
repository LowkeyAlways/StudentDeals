package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Deals;

public interface DealsRepository extends JpaRepository<Deals, Long> {

}
