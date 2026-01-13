package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.MouvementStock;
import com.example.demo.service.MouvementStockService;


@RestController
@RequestMapping("/api/mouvements")
@CrossOrigin(origins = "http://localhost:4200")
public class MouvementStockController {
	
	@Autowired
	MouvementStockService mouvementStockService;
	
	 @GetMapping
	    public List<MouvementStock> getAllMouvements() {
	        return mouvementStockService.getAll();
	    }
	 
	@PostMapping
	public ResponseEntity<MouvementStock> enregistrer(@RequestBody MouvementStock mvt) {
	    return ResponseEntity.ok(mouvementStockService.enregistrerMouvement(mvt));
	}
	
	@GetMapping("/produit/{produitId}")
	public ResponseEntity<List<MouvementStock>> getMouvementsParProduit(@PathVariable String produitId) {
	    List<MouvementStock> mouvements = mouvementStockService.getMouvementsParProduit(produitId);
	    return ResponseEntity.ok(mouvements);
	}



}
