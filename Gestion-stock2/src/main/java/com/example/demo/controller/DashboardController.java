package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.MouvementStockRepository;
import com.example.demo.ProduitRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private MouvementStockRepository mouvementRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalProduits = produitRepository.count();

        long totalEntrees = mouvementRepository.countByType("ENTREE");
        long totalSorties = mouvementRepository.countByType("SORTIE");

        stats.put("produits", totalProduits);
        stats.put("entrees", totalEntrees);
        stats.put("sorties", totalSorties);

        return stats;
    }
}
