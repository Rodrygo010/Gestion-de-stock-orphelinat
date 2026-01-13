import { Component, OnInit } from '@angular/core';
import { MouvementStock } from 'src/app/models/mouvement-stock.model';
import { MouvementStockService } from 'src/app/services/mouvement-stock.service';
import { Produit, ProduitService } from 'src/app/services/produit.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  styleUrls: ['./mouvement-stock.component.css']
})
export class MouvementStockComponent implements OnInit {
  mouvements: MouvementStock[] = [];
  produits: Produit[] = [];
  filtre: string = '';
  historiqueMouvements: MouvementStock[] = [];
  produitSelectionne: Produit | null = null;
  

  nouveauMouvement: MouvementStock = {
    produitId: '',
    type: 'ENTREE',
    quantite: 0,
    commentaire: '',
    date: new Date()
  };

  constructor(
    private mouvementService: MouvementStockService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.listerMouvements();
    this.chargerProduits();
  }

  listerMouvements(): void {
    this.mouvementService.getMouvements().subscribe(data => {
      this.mouvements = data;
    });
  }

  ajouterMouvement(): void {
    this.mouvementService.ajouterMouvement(this.nouveauMouvement).subscribe(() => {
      this.nouveauMouvement = {
        produitId: '',
        type: 'ENTREE',
        quantite: 0,
        commentaire: '',
        date: new Date()
      };
      this.listerMouvements();
    });
  }

  chargerProduits(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  getNomProduit(id: string): string {
    const produit = this.produits.find(p => p.id === id);
    return produit ? produit.nom : 'Produit inconnu';
  }

  getUniteProduit(id: string): string {
    const produit = this.produits.find(p => p.id === id);
    return produit ? produit.unite : 'N/A';
  }

  /**
   * New method to get a Product object by its ID.
   * This is crucial for passing the correct product to afficherHistorique.
   */
  getProduitById(id: string): Produit | undefined {
    return this.produits.find(p => p.id === id);
  }

  mouvementsFiltres(): MouvementStock[] {
    const filtreMin = this.filtre.toLowerCase();
    return this.mouvements.filter(mv => {
      const produit = this.produits.find(p => p.id === mv.produitId);
      const nomProduit = produit?.nom.toLowerCase() || '';
      const unite = produit?.unite.toLowerCase() || '';
      const type = mv.type.toLowerCase();
      const date = new Date(mv.date).toLocaleDateString();

      return (
        nomProduit.includes(filtreMin) ||
        unite.includes(filtreMin) ||
        type.includes(filtreMin) ||
        date.includes(filtreMin)
      );
    });
  }

  /**
   * Modified to accept a Product object (or undefined) and perform a check.
   */
  afficherHistorique(produit: Produit | undefined): void {
    if (produit) { // Only proceed if a valid product object is passed
      this.produitSelectionne = produit;
      this.mouvementService.getMouvementsParProduit(produit.id!).subscribe(data => {
        this.historiqueMouvements = data;
      });
    } else {
      // Optional: Handle cases where no product is found (e.g., show an alert)
      console.warn('Cannot display history: Product not found for the given movement.');
      this.historiqueMouvements = []; // Clear history if no product is selected
      this.produitSelectionne = null;
    }
  }

  exporterHistoriquePDF(): void {
  if (!this.produitSelectionne || this.historiqueMouvements.length === 0) {
    alert('Aucun historique à exporter.');
    return;
  }

  const doc = new jsPDF();

  const nomProduit = this.produitSelectionne.nom;
  const categorie = this.produitSelectionne.categorie;
  const unite = this.produitSelectionne.unite;
  const stockActuel = this.produitSelectionne.quantiteTotale;

  // Titre stylé
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 120);
  doc.text(` Historique du Produit`, 70, 15);

  // Infos produit
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(` ID : ${this.produitSelectionne.id}`, 14, 30);
  doc.text(` Nom : ${nomProduit}`, 14, 38);
  doc.text(` Catégorie : ${categorie}`, 14, 46);
  doc.text(` Stock Actuel : ${stockActuel} ${unite}`, 14, 54);

  // Table de mouvements
  const rows = this.historiqueMouvements.map((mv, index) => [
    index + 1,
    new Date(mv.date).toLocaleDateString(),
    mv.type === 'ENTREE' ? 'Entrée' : 'Sortie',
    mv.quantite,
    unite,
     mv.commentaire || '' // 👈 Afficher le commentaire (ex: "Don de : Société X")
  ]);

  autoTable(doc, {
    startY: 65,
    head: [['#', 'Date', 'Type', 'Quantité', 'Unité','Commentaire']],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    styles: {
      fontSize: 10,
      cellPadding: 3
    }
  });

  // Pied de page
  const dateExport = new Date().toLocaleString();
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(` Exporté le : ${dateExport}`, 14, doc.internal.pageSize.height - 10);

  doc.save(`historique_${nomProduit}.pdf`);
}


exporterHistoriqueExcel(): void {
  if (!this.produitSelectionne || this.historiqueMouvements.length === 0) {
    alert('Aucun historique à exporter.');
    return;
  }

  const nomProduit = this.produitSelectionne.nom;
  const quantiteTotale = this.produitSelectionne.quantiteTotale;
  const unite = this.produitSelectionne.unite;

  const headerInfo = [
    { Produit: nomProduit, 'Quantité Totale': `${quantiteTotale} ${unite}` },
    {}, // ligne vide pour séparer
  ];

  const historiqueData = this.historiqueMouvements.map(mv => ({
    Date: new Date(mv.date).toLocaleDateString(),
    Type: mv.type,
    Quantité: mv.quantite,
    Unité: this.getUniteProduit(mv.produitId),
    Commentaire : mv.commentaire
  }));

  const worksheet = XLSX.utils.json_to_sheet([...headerInfo, ...historiqueData]);
  const workbook = { Sheets: { 'Historique': worksheet }, SheetNames: ['Historique'] };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  FileSaver.saveAs(blob, `historique_${nomProduit}.xlsx`);
}



}