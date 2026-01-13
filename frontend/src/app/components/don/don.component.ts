import { Component, OnInit } from '@angular/core';
import { DonService,Don,Produit } from 'src/app/services/don.service';

@Component({
  selector: 'app-don',
  templateUrl: './don.component.html'
})
export class DonComponent implements OnInit {
  dons: Don[] = [];
  produits: Produit[] = [];
  nouveauDon: Don = {
    produitId: '',
    quantite: 0,
    unite: '',
    beneficiaire: '',
    date: new Date().toISOString().substring(0, 10)
  };

  nomRecherche = '';


  constructor(private donService: DonService) {}

  ngOnInit(): void {
    this.chargerDons();
    this.chargerProduits();
  }

  chargerDons(): void {
    this.donService.getDons().subscribe(data => this.dons = data);
  }

  chargerProduits(): void {
    this.donService.getProduits().subscribe(data => this.produits = data);
  }

  enregistrer(): void {
    const produit = this.produits.find(p => p.id === this.nouveauDon.produitId);
    if (produit) {
      this.nouveauDon.nomProduit = produit.nom;
      this.nouveauDon.unite = produit.unite;
    }

    this.donService.enregistrerDon(this.nouveauDon).subscribe(() => {
      this.nouveauDon = {
        produitId: '',
        quantite: 0,
        unite: '',
        beneficiaire: '',
        date: new Date().toISOString().substring(0, 10)
      };
      this.chargerDons();
    });
  }

  

 

rechercherParNom() {
  const nom = this.nomRecherche.trim();
  if (nom.length === 0) {
    // Recharge tous les dons si le champ est vide
    this.chargerDons();
    return;
  }

  this.donService.rechercherParNom(nom).subscribe(data => {
    this.dons = data;
  });
}


}
