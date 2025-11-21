package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Deals;
import com.example.demo.services.DealsService;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
public class DealsController {

    @Autowired
    DealsService dealsService;

    @PostMapping("/save")
    public Deals addDeals(@RequestBody Deals deals) {
        return dealsService.addDeals(deals);
    }

    @GetMapping("/id/{idDeals}")
    public Deals getDeals(@PathVariable Long idDeals) {
        return dealsService.getDealsById(idDeals);
    }

    @GetMapping("/categorie/{idCategorie}")
    public List<Deals> getDealsByCategorie(@PathVariable Long idCategorie) {
        return dealsService.getDealsByCategorie(idCategorie);
    }

    @PutMapping("/update/{idDeals}")
    public Deals updateDeals(@PathVariable Long idDeals, @RequestBody Deals deals) {
        return dealsService.updateDeals(idDeals, deals);
    }

    @DeleteMapping("/delete/id/{idDeals}")
    public void deleteDealsById(@PathVariable Long idDeals) {
        dealsService.deleteDealsById(idDeals);
    }

    @DeleteMapping("/delete/categorie/{idCategorie}")
    public void deleteDealsByCategorie(@PathVariable Long idCategorie) {
        dealsService.deleteDealsByCategorie(idCategorie);
    }
}
