import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private apiUrl = 'http://localhost:5000/api/auth/career';

  constructor(private http: HttpClient) { }
 private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust if you store your token elsewhere
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  
 
  getRecommendations(userId: string,profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recommendations/${userId}`, profileData, {
      headers: this.getAuthHeaders()
    });
  }
  saveCareerProfile(userId: string,profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveProfile/${userId}`, profileData, {
      headers: this.getAuthHeaders()
    });
  }

 getUserCareerProfile(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/profile/${userId}` ,{
      headers: this.getAuthHeaders()
    });
  }

}
