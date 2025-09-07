import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) { }
  getResumes(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/getResumes/${userId}`);
  }
  createResume(resumeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createResume`, resumeData);
  }
  updateResume(id: number, resumeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, resumeData);
  }
  deleteResume(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
