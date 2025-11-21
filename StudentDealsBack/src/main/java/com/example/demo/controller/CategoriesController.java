package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Categories;
import com.example.demo.repositories.CategorieRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriesController {

    @Autowired
    private CategorieRepository categorieRepository;

    @GetMapping("/all")
    public List<Categories> getAll() {
        return categorieRepository.findAll();
    }

    // helper to initialize categories from enum if table empty
    @PostMapping("/init")
    public List<Categories> initIfEmpty() {
        List<Categories> existing = categorieRepository.findAll();
        if (existing != null && !existing.isEmpty()) return existing;

        for (Categories.categorie_deals val : Categories.categorie_deals.values()) {
            Categories c = new Categories();
            c.setCategorie_deals(val);
            categorieRepository.save(c);
        }
        return categorieRepository.findAll();
    }
}
