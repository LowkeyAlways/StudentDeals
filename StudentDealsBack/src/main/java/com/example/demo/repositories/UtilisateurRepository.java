package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    void deleteByAdresseMail(String adresseMail);
    Utilisateur findByAdresseMail(String adresseMail);
}
