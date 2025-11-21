package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Deals;
import com.example.demo.repositories.DealsRepository;
import com.example.demo.repositories.CategorieRepository;
import com.example.demo.entities.Categories;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class DealsServiceImpl implements DealsService {

    @Autowired
    private DealsRepository dealsRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private OpenGraphService openGraphService;

    @Override
    public Deals addDeals(Deals deals) {
        // If a category id was provided, load the managed Categories entity and set it
        try {
            if (deals.getCategorie() != null && deals.getCategorie().getId_categorie() != null) {
                Long cid = deals.getCategorie().getId_categorie();
                Categories c = categorieRepository.findById(cid).orElse(null);
                if (c != null) {
                    deals.setCategorie(c);
                }
            }
        } catch (Exception e) {
            // ignore and proceed to save; if category mapping fails, repository may throw
        }
        if (deals.getUrl() != null && (deals.getImageUrl() == null || deals.getImageUrl().isBlank())) {
            String ogImage = openGraphService.extractImageUrl(deals.getUrl());
            if (ogImage != null) {
                deals.setImageUrl(ogImage);
            }
        }
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
    public List<Deals> getAllDeals() {
        return dealsRepository.findAll();
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
