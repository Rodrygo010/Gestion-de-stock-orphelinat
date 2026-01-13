export interface MouvementStock {
  commentaire: string;
  id?: string;
  produitId: string;
  type: 'ENTREE' | 'SORTIE';
  quantite: number;
  date: Date;
}
