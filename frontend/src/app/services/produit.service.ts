import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  id?: string;
  nom: string;
  categorie: string;
  quantiteTotale: number;
  unite: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8080/api/produits';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  supprimerProduit(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

mettreAJourProduit(id: string, produit: Produit): Observable<Produit> {
  return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
}

}
