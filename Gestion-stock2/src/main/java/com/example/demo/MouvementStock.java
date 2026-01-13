package com.example.demo;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mouvements_stock")
public class MouvementStock {
    @Id
    private String id;
    private String produitId;
    private int quantite;
    private String type; // "ENTREE" ou "SORTIE"
    private LocalDate date;
    private String commentaire; // 👉 Pour indiquer la source : société, utilisateur, etc.
    
    
    
    
	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProduitId() {
		return produitId;
	}
	public void setProduitId(String produitId) {
		this.produitId = produitId;
	}
	public int getQuantite() {
		return quantite;
	}
	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
    
    
}

