package com.example.demo.services;

import com.example.demo.entities.Deals;
import java.util.List;

public interface DealsService {

    Deals addDeals(Deals deals);

    Deals updateDeals(Long idDeals, Deals deals);

    Deals getDealsById(Long idDeals);

    List<Deals> getDealsByCategorie(Long idCategorie);

    void deleteDealsById(Long idDeals);

    void deleteDealsByCategorie(Long idCategorie);
}
