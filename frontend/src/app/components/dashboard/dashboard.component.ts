import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = { produits: 0, entrees: 0, sorties: 0 };

  chartLabels = ['Produits', 'Entrées', 'Sorties'];
  chartData = {
    labels: this.chartLabels,
    datasets: [
      {
        label: 'Statistiques',
        data: [0, 0, 0],
        backgroundColor: ['#007bff', '#28a745', '#dc3545']
      }
    ]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
      this.chartData.datasets[0].data = [
        data.produits,
        data.entrees,
        data.sorties
      ];
    });
  }
}
