package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "produits")
public class Produit {

    @Id
    private String id;
    private String nom;
    private String categorie;
    private int quantiteTotale;
    private String unite;

    public Produit() {
    }

    public Produit(String id, String nom, String categorie, int quantiteTotale, String unite) {
        this.id = id;
        this.nom = nom;
        this.categorie = categorie;
        this.quantiteTotale = quantiteTotale;
        this.unite = unite;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }

    public int getQuantiteTotale() { return quantiteTotale; }
    public void setQuantiteTotale(int quantiteTotale) { this.quantiteTotale = quantiteTotale; }

    public String getUnite() { return unite; }
    public void setUnite(String unite) { this.unite = unite; }

    @Override
    public String toString() {
        return "Produit{" +
                "id='" + id + '\'' +
                ", nom='" + nom + '\'' +
                ", categorie='" + categorie + '\'' +
                ", quantiteTotale=" + quantiteTotale +
                ", unite='" + unite + '\'' +
                '}';
    }
}
