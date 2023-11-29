import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  sendPictureForPrediction(photo: any): Observable<any> {
    console.log('je suis dans la delete dans service camera');

    return this.http.post<any>(`${this.baseUrl}/photo`, {
      key: photo,
    });
  }

  geCurrentFormation(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/formation`);
  }

  getEtudiantsByFormation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/formation/etudiants/${id}`);
  }

  absentToPresent(etudiantID: number, formationID: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/etudiantAbsent/${etudiantID}/${formationID}`
    );
  }

  absentToPresent2(etudiantID: number, formationID: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/etudiantAbsentAPM/${etudiantID}/${formationID}`
    );
  }
}
