package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Produit;
import com.example.demo.service.ProduitService;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin("*")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public List<Produit> getAll() {
        return produitService.getAll();
    }

    @PostMapping
    public Produit create(@RequestBody Produit produit) {
        return produitService.create(produit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        produitService.delete(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Optional<Produit>> updateProduit(@PathVariable String id, @RequestBody Produit produit) {
        return ResponseEntity.ok(produitService.mettreAJourProduit(id, produit));
    }

}
