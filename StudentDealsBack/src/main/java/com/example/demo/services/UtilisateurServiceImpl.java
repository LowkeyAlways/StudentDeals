package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Utilisateur;
import com.example.demo.repositories.UtilisateurRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur addUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @Override
    public void deleteUtilisateurById(Long idUtilisateur) {
        utilisateurRepository.deleteById(idUtilisateur);
    }

    @Override
    public Utilisateur deleteUtilisateurByMail(String adresseMail) {
        Utilisateur u = utilisateurRepository.findByAdresseMail(adresseMail);
        if (u != null) {
            utilisateurRepository.deleteByAdresseMail(adresseMail);
        }
        return u;
    }

    @Override
    public Utilisateur updateUtilisateur(Long idUtilisateur, Utilisateur utilisateur) {

        Utilisateur u = utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        u.setNomUtilisateur(utilisateur.getNomUtilisateur());
        u.setPrenomUtilisateur(utilisateur.getPrenomUtilisateur());
        u.setAdresseMail(utilisateur.getAdresseMail());
        u.setMotDePasse(utilisateur.getMotDePasse());
        u.setBranche(utilisateur.getBranche());

        return utilisateurRepository.save(u);
    }

    @Override
    public Utilisateur getUtilisateurById(Long idUtilisateur) {
        return utilisateurRepository.findById(idUtilisateur)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
    }
}
