package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Deals;
import com.example.demo.repositories.DealsRepository;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DealsServiceImpl implements DealsService {

    @Autowired
    private DealsRepository dealsRepository;

    @Override
    public Deals addDeals(Deals deals) {
        return dealsRepository.save(deals);
    }

    @Override
    public Deals updateDeals(Long idDeals, Deals deals) {
        Deals d = dealsRepository.findById(idDeals)
                .orElseThrow(() -> new RuntimeException("Deals introuvable"));

        d.setTitre(deals.getTitre());
        d.setDescription(deals.getDescription());
        d.setCategorie(deals.getCategorie());

        return dealsRepository.save(d);
    }

    @Override
    public Deals getDealsById(Long idDeals) {
        return dealsRepository.findById(idDeals)
                .orElseThrow(() -> new RuntimeException("Deals introuvable"));
    }

    @Override
    public List<Deals> getDealsByCategorie(Long idCategorie) {
        return dealsRepository.findAll()
                .stream()
                .filter(d -> d.getCategorie().getId_categorie().equals(idCategorie))
                .toList();
    }

    @Override
    public void deleteDealsById(Long idDeals) {
        dealsRepository.deleteById(idDeals);
    }

    @Override
    public void deleteDealsByCategorie(Long idCategorie) {
        dealsRepository.findAll()
                .stream()
                .filter(d -> d.getCategorie().getId_categorie().equals(idCategorie))
                .forEach(d -> dealsRepository.deleteById(d.getId_deals()));
    }
}
