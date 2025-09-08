import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) { }
 private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust if you store your token elsewhere
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  getSkillAnalysis(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/skills/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }


  analyzeSkills(skillData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, skillData)
  }
  saveSkillAnalysis(analysisData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, analysisData);
  }
}
