import { Component, OnInit, TrackByFunction } from '@angular/core';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formations: any[] = [];
  formations2: any[] = []; // Remplacer par votre type de données
  formationSelectionnee: any[] = []; // Remplacer par votre type de données

  presenceMatin: any[] = [];
  presenceApresMidi: any[] = [];

  messageAVM: boolean = false;
  nbPresent: number = 0;
  estMatin: boolean = false;
  estSelectionne: boolean = false;
  selectedFormationId: number | null = null;
  private refreshInterval: any;
  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    this.loadData();
    this.refreshInterval = setInterval(() => {
      this.loadData();
    }, 5000);
    // Initialiser les formations ici

    const now = new Date();

    // Créer une nouvelle instance de Date pour aujourd'hui avec l'heure fixée à 12:30:00
    const midday = new Date();
    midday.setHours(12, 30, 0); // Heure, minutes, secondes

    // Comparer les deux instances
    if (now > midday) {
      this.messageAVM = true;
    }
    console.log(this.messageAVM);
    console.log('date now', Date.now());
    console.log('date parse', Date.parse('12:30:00'));
  }
  loadData(): void {
    // pour charger la page apres chaque Minute
    this.cameraService.geCurrentFormation().subscribe((data) => {
      console.log(data);
      this.formations = data;
      this.formations2 = data;
      this.getEtudiantsByFormation(this.selectedFormationId);
      console.log('je rafreshi la page');
    });
  }
  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  // getEtudiant(data: any) {
  //   this.formationSelectionnee = data;

  //   this.presenceMatin = []; //this.formationSelectionnee; // presence matinale
  //   this.presenceApresMidi = []; //this.formationSelectionnee; // presence apres midi

  //   for (let i = 0; i < this.formationSelectionnee.length; i++) {
  //     // console.log(this.formationSelectionnee[i].presence_date);
  //     let presence_heure;
  //     if (this.formationSelectionnee[i].presence_date != null) {
  //       presence_heure =
  //         this.formationSelectionnee[i].presence_date.split(' ')[4];
  //     }

  //     if (
  //       (presence_heure >= '09:00:00' && presence_heure <= '12:30:00') ||
  //       presence_heure == null
  //     ) {
  //       console.log(
  //         'je suis dans le matin',
  //         this.formationSelectionnee[i].presence_date
  //       );

  //       this.presenceMatin.push(this.formationSelectionnee[i]);

  //       // this.presenceMatin.includes(this.formationSelectionnee[i]);
  //     }

  //     if (
  //       (presence_heure >= '12:30:00' && presence_heure <= '17:00:00') ||
  //       presence_heure == null
  //     ) {
  //       console.log(
  //         'je suis dans l apres midi ',
  //         this.formationSelectionnee[i].presence_date
  //       );
  //       this.presenceApresMidi.push(this.formationSelectionnee[i]);
  //     }
  //   }
  // }
  //2 eme getEtudiant a tester
  getEtudiant(data: any) {
    this.formationSelectionnee = data;

    const midday = '12:30:00';

    // Ajoutez une propriété pour suivre la présence
    this.formationSelectionnee.forEach((etudiant) => {
      let presenceHeure = etudiant.presence_date
        ? etudiant.presence_date.split(' ')[4]
        : null; // Assurez-vous que l'index est correct
      etudiant.presentMatin =
        presenceHeure && presenceHeure >= '09:00:00' && presenceHeure <= midday;
      etudiant.presentApresMidi =
        presenceHeure && presenceHeure > midday && presenceHeure <= '17:00:00';
    });

    // Utilisez la même liste pour le matin et l'après-midi
    this.presenceMatin = [...this.formationSelectionnee];
    console.log('matinnnn', this.presenceMatin);
    this.presenceApresMidi = [...this.formationSelectionnee];
    console.log('apres midiiii', this.presenceApresMidi);
  }

  getEtudiantsByFormation(id_formationCal: any) {
    this.estSelectionne = true;
    this.messageAVM = true;
    this.selectedFormationId = id_formationCal;
    this.cameraService
      .getEtudiantsByFormation(id_formationCal)
      .subscribe((data) => {
        this.getEtudiant(data);
      }); //
  }
  absentToPresent(etudiantID: number, formationID: number) {
    this.cameraService
      .absentToPresent(etudiantID, formationID)
      .subscribe((data) => {
        console.log(data);
      });
  }
  absentToPresent2(etudiantID: number, formationID: number) {
    this.cameraService
      .absentToPresent2(etudiantID, formationID)
      .subscribe((data) => {
        console.log(data);
      });
  }
  //permet de changer le composant dans html
  trackByFn(index: any, item: any) {
    return item.index;
  }
  //on verifie si c est si on est aprés midi pour activer le button checker
  isApresMidi(): boolean {
    const now = new Date();
    return (
      now.getHours() > 13 || (now.getHours() === 13 && now.getMinutes() > 30)
    );
  }
}
