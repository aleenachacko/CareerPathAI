import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  setUserId(userId: string): void {
    sessionStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  clearSession(): void {
    sessionStorage.clear();
  }
}