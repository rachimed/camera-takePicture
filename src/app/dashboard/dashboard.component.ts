import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formations!: any[]; // Remplacer par votre type de données
  formationSelectionnee: any; // Remplacer par votre type de données

  constructor() {}

  ngOnInit() {
    // Initialiser les formations ici
  }

  afficherDetails(formation: any) {
    this.formationSelectionnee = formation;
  }
}
