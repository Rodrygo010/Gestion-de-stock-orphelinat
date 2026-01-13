package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.MouvementStock;
import com.example.demo.MouvementStockRepository;
import com.example.demo.Produit;
import com.example.demo.ProduitRepository;

@Service
public class MouvementStockService {
	
	@Autowired
	ProduitRepository produitRepository;
	
	@Autowired
	MouvementStockRepository mouvementStockRepository;
	
	public MouvementStock enregistrerMouvement(MouvementStock mvt) {
	    // Met à jour la quantité dans le produit
	    Produit produit = produitRepository.findById(mvt.getProduitId())
	        .orElseThrow(() -> new RuntimeException("Produit introuvable"));

	    if (mvt.getType().equals("ENTREE")) {
	        produit.setQuantiteTotale(produit.getQuantiteTotale() + mvt.getQuantite());
	    } else if (mvt.getType().equals("SORTIE")) {
	        produit.setQuantiteTotale(produit.getQuantiteTotale() - mvt.getQuantite());
	    }

	    produitRepository.save(produit);
	    return mouvementStockRepository.save(mvt);
	}
	
	  public List<MouvementStock> getAll() {
	        return mouvementStockRepository.findAll();
	    }
	  
	  public List<MouvementStock> getMouvementsParProduit(String produitId) {
		    return mouvementStockRepository.findByProduitId(produitId);
		}
	  
	  public int calculerStockActuel(String produitId) {
		    List<MouvementStock> mouvements = mouvementStockRepository.findByProduitId(produitId);
		    int stock = 0;
		    for (MouvementStock mvt : mouvements) {
		        if ("ENTREE".equals(mvt.getType())) {
		            stock += mvt.getQuantite();
		        } else if ("SORTIE".equals(mvt.getType())) {
		            stock -= mvt.getQuantite();
		        }
		    }
		    return stock;
		}


}
