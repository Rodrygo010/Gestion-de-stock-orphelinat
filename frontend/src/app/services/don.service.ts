import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Don {
  id?: string;
  produitId: string;
  nomProduit?: string;
  quantite: number;
  unite: string;
  beneficiaire: string;
  date: string;
}

export interface Produit {
  id: string;
  nom: string;
  unite: string;
}

@Injectable({ providedIn: 'root' })
export class DonService {
  private apiUrl = 'http://localhost:8080/api/dons';
  private produitUrl = 'http://localhost:8080/api/produits';

  constructor(private http: HttpClient) {}

  getDons(): Observable<Don[]> {
    return this.http.get<Don[]>(this.apiUrl);
  }

  enregistrerDon(don: Don): Observable<Don> {
    return this.http.post<Don>(this.apiUrl, don);
  }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produitUrl);
  }

  rechercherParNom(nom: string): Observable<Don[]> {
  return this.http.get<Don[]>(`${this.apiUrl}/search/${nom}`);
}

}
