import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './components/produit/produit.component';
import { MouvementStockComponent } from './components/mouvement-stock/mouvement-stock.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';

import { DonComponent } from './components/don/don.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';





@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    MouvementStockComponent,
    DashboardComponent,
    DonComponent,
    SidebarComponent,
    Dashboard2Component,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
