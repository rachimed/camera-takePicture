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

  presenceMatin: any[] = [];
  presenceApresMidi: any[] = [];

  messageAVM: boolean = false;
  nbPresent: number = 0;

  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    // Initialiser les formations ici
    this.cameraService.geCurrentFormation().subscribe((data) => {
      console.log(data);
      this.formations = data;
    });
    if (Date.now() > Date.parse('12:30:00')) {
      this.messageAVM = true;
    }
  }
  getEtudiant(data: any) {
    this.formationSelectionnee = data;

    this.presenceMatin = [];
    this.presenceApresMidi = [];
    for (let i = 0; i < this.formationSelectionnee.length; i++) {
      // console.log(this.formationSelectionnee[i].presence_date);
      let presence_heure;
      if (this.formationSelectionnee[i].presence_date != null) {
        presence_heure =
          this.formationSelectionnee[i].presence_date.split(' ')[4];
      }

      if (
        (presence_heure >= '09:00:00' && presence_heure <= '12:30:00') ||
        presence_heure == null
      ) {
        console.log(
          'je suis dans le matin',
          this.formationSelectionnee[i].presence_date
        );

        this.presenceMatin.push(this.formationSelectionnee[i]);

        // this.presenceMatin.includes(this.formationSelectionnee[i]);
      }

      if (
        (presence_heure >= '12:30:00' && presence_heure <= '17:00:00') ||
        (presence_heure == null && Date.now() >= Date.parse('12:30:00'))
      ) {
        console.log(
          'je suis dans l apres midi ',
          this.formationSelectionnee[i].presence_date
        );
        this.presenceApresMidi.push(this.formationSelectionnee[i]);
      }
    }
  }

  getEtudiantsByFormation(id_formationCal: any) {
    this.cameraService
      .getEtudiantsByFormation(id_formationCal)
      .subscribe((data) => {
        this.getEtudiant(data);
      }); //
  }
}
