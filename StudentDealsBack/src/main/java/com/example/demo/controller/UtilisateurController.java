package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.demo.entities.Utilisateur;
import com.example.demo.services.UtilisateurService;
import com.example.demo.dto.LoginRequest;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/utilisateur")
public class UtilisateurController {

    @Autowired
    UtilisateurService utilisateurService;

    @PostMapping("/save")
    public Utilisateur addUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.addUtilisateur(utilisateur);
    }

    @DeleteMapping("/delete/id/{idUtilisateur}")
    public void deleteUtilisateurById(@PathVariable Long idUtilisateur) {
        utilisateurService.deleteUtilisateurById(idUtilisateur);
    }

    @DeleteMapping("/delete/mail/{mail}")
    public Utilisateur deleteUtilisateurByMail(@PathVariable("mail") String adresseMail) {
        return utilisateurService.deleteUtilisateurByMail(adresseMail);
    }

    @GetMapping("/id/{idUtilisateur}")
    public Utilisateur getUtilisateur(@PathVariable Long idUtilisateur) {
        return utilisateurService.getUtilisateurById(idUtilisateur);
    }

    @PutMapping("/update/{idUtilisateur}")
    public Utilisateur updateUtilisateur(@PathVariable Long idUtilisateur,
                                         @RequestBody Utilisateur utilisateur) {
        return utilisateurService.updateUtilisateur(idUtilisateur, utilisateur);
    }

    @PostMapping("/login")
    public Utilisateur login(@RequestBody LoginRequest request) {
        return utilisateurService.authenticate(request.getAdresseMail(), request.getMotDePasse());
    }
}
