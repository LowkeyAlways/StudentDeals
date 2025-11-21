package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Alerte;

public interface AlerteRepository extends JpaRepository<Alerte, Long> {

}
