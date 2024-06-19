import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
@Injectable()
export class AuthService {
  private authUrl = environment.url;
  private user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();
  private currentUserEmail: string; // Lưu trữ ID của người dùng hiện tại
  
  constructor(private http: HttpClient, private router: Router) {
    this.currentUser.subscribe(user => {
      if (user) {
        this.currentUserEmail = user.email; // Lưu ID của người dùng hiện tại
      }
    });
  }

   login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Lưu token và lấy thông tin người dùng
          localStorage.setItem('token', response.token);
          this.getUserInfo().subscribe();
          return true;
        }
        return false;
      })
    );
  }

  private decodeToken(token: string): any {
    // Decode the token using atob to check its content
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.authUrl}/users/${this.currentUserEmail}`, { headers }).pipe(
      tap((response: any) => {
        console.log('User Info:', response);  // Kiểm tra thông tin người dùng nhận được
        this.user.next(response);
        return response;
      })
    );
  }
  
  
  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

}
