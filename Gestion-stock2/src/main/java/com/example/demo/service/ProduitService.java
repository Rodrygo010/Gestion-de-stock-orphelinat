package com.example.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Produit;
import com.example.demo.ProduitRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;
    
    @Autowired
    private MouvementStockService mouvementStockService;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> getAll() {
        List<Produit> produits = produitRepository.findAll();
        for (Produit produit : produits) {
            int stockActuel = mouvementStockService.calculerStockActuel(produit.getId());
            produit.setQuantiteTotale(stockActuel); // 🔁 mise à jour
        }
        return produits;
    }

    public Produit create(Produit produit) {
        return produitRepository.save(produit);
    }

    public void delete(String id) {
        produitRepository.deleteById(id);
    }
    
    public Optional<Produit> mettreAJourProduit(String id, Produit produitModifie) {
        return produitRepository.findById(id).map(produitExistant -> {
            produitExistant.setNom(produitModifie.getNom());
            produitExistant.setCategorie(produitModifie.getCategorie());
            produitExistant.setQuantiteTotale(produitModifie.getQuantiteTotale());
            produitExistant.setUnite(produitModifie.getUnite());
            return produitRepository.save(produitExistant);
        });
    }

	
	
   

    
}
