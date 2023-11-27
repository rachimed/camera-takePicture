import { Component, OnInit } from '@angular/core';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formations!: any[]; // Remplacer par votre type de données
  formationSelectionnee: any[] = []; // Remplacer par votre type de données

  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    // Initialiser les formations ici
    this.cameraService.geCurrentFormation().subscribe((data) => {
      this.formations = data;
    });
  }

  getEtudiantsByFormation(id_formationCal: any) {
    this.cameraService
      .getEtudiantsByFormation(id_formationCal)
      .subscribe((data) => {
        this.formationSelectionnee = data;
      });
  }
}
