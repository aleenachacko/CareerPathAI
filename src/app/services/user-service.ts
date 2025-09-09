import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/auth/users';
  constructor(private http: HttpClient) { }
   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust if you store your token elsewhere
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  updateProfile(id: String,profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${id}`, profileData, {
      headers: this.getAuthHeaders()
    });
  }
  changePassword(id: String,passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/password/${id}`, passwordData, {
      headers: this.getAuthHeaders()
    });
}
}
