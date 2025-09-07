import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = 'http://localhost:5000/api/skills';
  constructor(private http: HttpClient) { }
  getSkillAnalysis(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  analyzeSkills(skillData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, skillData);
  }
  saveSkillAnalysis(analysisData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, analysisData);
  }
}
