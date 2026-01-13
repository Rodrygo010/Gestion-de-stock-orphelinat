import { Component, OnInit } from '@angular/core';
import { Produit, ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[] = [];
  nouveauProduit: Produit = {
    nom: '',
    categorie: '',
    quantiteTotale: 0,
    unite: ''
  };

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.listerProduits();
  }

  listerProduits(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  ajouterProduit(): void {
    this.produitService.ajouterProduit(this.nouveauProduit).subscribe(() => {
      this.nouveauProduit = { nom: '', categorie: '', quantiteTotale: 0, unite: '' };
      this.listerProduits();
    });
  }

  supprimerProduit(id: string): void {
  this.produitService.supprimerProduit(id).subscribe(() => {
    this.listerProduits(); // met à jour la liste
  });
}

produitEnEdition: Produit | null = null;

modifierProduit(produit: Produit): void {
  this.produitEnEdition = { ...produit };
  this.nouveauProduit = { ...produit };
}

mettreAJourProduit(): void {
  if (!this.produitEnEdition?.id) return;

  this.produitService.mettreAJourProduit(this.produitEnEdition.id, this.nouveauProduit).subscribe(() => {
    this.produitEnEdition = null;
    this.nouveauProduit = { nom: '', categorie: '', quantiteTotale: 0, unite: '' };
    this.listerProduits();
  });
}


}
