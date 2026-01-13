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

import com.example.demo.Don;
import com.example.demo.service.DonService;

@RestController
@RequestMapping("/api/dons")
@CrossOrigin(origins = "http://localhost:4200")
public class DonController {

    @Autowired
    private DonService donService;

    @PostMapping
    public ResponseEntity<Don> enregistrer(@RequestBody Don don) {
        return ResponseEntity.ok(donService.enregistrer(don));
    }

    @GetMapping
    public List<Don> getAll() {
        return donService.getAll();
    }

    @GetMapping("/search/{nom}")
    public List<Don> searchByBeneficiaire(@PathVariable String nom) {
        return donService.searchByBeneficiaire(nom);
    }

}
