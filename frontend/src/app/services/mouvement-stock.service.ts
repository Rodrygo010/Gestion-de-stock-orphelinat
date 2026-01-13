import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MouvementStock } from '../models/mouvement-stock.model';
import { Produit } from './produit.service';

@Injectable({
  providedIn: 'root'
})
export class MouvementStockService {
  private apiUrl = 'http://localhost:8080/api/mouvements';

  constructor(private http: HttpClient) {}

  getMouvements(): Observable<MouvementStock[]> {
    return this.http.get<MouvementStock[]>(this.apiUrl);
  }

  ajouterMouvement(mouvement: MouvementStock): Observable<MouvementStock> {
    return this.http.post<MouvementStock>(this.apiUrl, mouvement);
  }

  getMouvementsParProduit(produitId: string): Observable<MouvementStock[]> {
  return this.http.get<MouvementStock[]>(`${this.apiUrl}/produit/${produitId}`);
}

getHistoriqueParProduit(produitId: string): Observable<{
  historique: MouvementStock[],
  produit: Produit,
  stockActuel: number
}> {
  return this.http.get<{
    historique: MouvementStock[],
    produit: Produit,
    stockActuel: number
  }>(`${this.apiUrl}/produits/${produitId}/historique`);
}


}
