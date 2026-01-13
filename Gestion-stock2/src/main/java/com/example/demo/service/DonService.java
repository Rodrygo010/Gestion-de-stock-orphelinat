package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Don;
import com.example.demo.DonRepository;
import com.example.demo.MouvementStock;
import com.example.demo.Produit;
import com.example.demo.ProduitRepository;

@Service
public class DonService {
    @Autowired
    private DonRepository donRepository;
    
    @Autowired
    private MouvementStockService mouvementStockService;

    @Autowired
    private ProduitRepository produitRepository; // Pour mettre à jour la quantité


    public Don enregistrer(Don don) {
        // 1. Enregistrer le don
        Don savedDon = donRepository.save(don);

        // 2. Créer un mouvement de type ENTREE
        MouvementStock mvt = new MouvementStock();
        mvt.setProduitId(don.getProduitId());
        mvt.setType("ENTREE"); // car c'est un don reçu
        mvt.setQuantite(don.getQuantite());
        mvt.setDate(LocalDate.now());
        mvt.setCommentaire("Don reçu de : " + don.getBeneficiaire());

        mouvementStockService.enregistrerMouvement(mvt);

        // 3. Mettre à jour la quantité du produit
        Produit produit = produitRepository.findById(don.getProduitId())
            .orElseThrow(() -> new RuntimeException("Produit introuvable"));
        produit.setQuantiteTotale(produit.getQuantiteTotale() + don.getQuantite()); // 🔼 Incrémentation
        produitRepository.save(produit);

        return savedDon;
    }



    public List<Don> getAll() {
        return donRepository.findAll();
    }

    public List<Don> searchByBeneficiaire(String pattern) {
        return donRepository.findByBeneficiaireRegex("(?i)^" + pattern); // insensitive & startsWith
    }
    
    

}
