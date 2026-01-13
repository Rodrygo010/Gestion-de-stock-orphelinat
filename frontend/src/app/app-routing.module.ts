import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit.component';
import { MouvementStockComponent } from './components/mouvement-stock/mouvement-stock.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonComponent } from './components/don/don.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';

const routes: Routes = [
  { path: 'produits', component: ProduitComponent },
  { path: '', redirectTo: 'produits', pathMatch: 'full' } ,// page par défaut
   { path: 'mouvements', component: MouvementStockComponent },
    { path: 'stats', component: DashboardComponent },
    { path: 'dons', component: DonComponent },
    { path: 'dashoard2', component: Dashboard2Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
