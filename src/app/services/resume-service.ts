import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust if you store your token elsewhere
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getResumes(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/getResumes/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  createResume(resumeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createResume`, resumeData, {
      headers: this.getAuthHeaders()
    });
  }

  updateResume(id: number, resumeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/resume/${id}`, resumeData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteResume(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/resume/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
