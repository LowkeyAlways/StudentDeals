package com.example.demo.services;

import com.example.demo.entities.Utilisateur;

public interface UtilisateurService {

    Utilisateur addUtilisateur(Utilisateur utilisateur);

    void deleteUtilisateurById(Long idUtilisateur);

    Utilisateur deleteUtilisateurByMail(String adresseMail);

    Utilisateur updateUtilisateur(Long idUtilisateur, Utilisateur utilisateur);

    Utilisateur getUtilisateurById(Long idUtilisateur);
}
