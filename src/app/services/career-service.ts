import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private apiUrl = 'http://localhost:5000/api/career';

  constructor(private http: HttpClient) { }

  getRecommendations(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recommendations`, profileData);
  }

  saveCareerProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile`, profileData);
  }

  getUserCareerProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }
}
