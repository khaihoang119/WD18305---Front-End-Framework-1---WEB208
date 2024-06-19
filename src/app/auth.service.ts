import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
 private authUrl = environment.url; // Đảm bảo rằng bạn đang sử dụng đúng URL của API
  private user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();
  private currentUserId: string; // Lưu trữ ID của người dùng hiện tại

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if (token) {
      this.setUserFromToken(token);
      this.getUserInfo().subscribe();
    }
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Lưu token và lấy thông tin người dùng
          localStorage.setItem('token', response.token);
          this.setUserFromToken(response.token);
          this.getUserInfo().subscribe();
        }
      })
    );
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  private setUserFromToken(token: string) {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.user) {
      this.currentUserId = decodedToken.user.id; // Lưu ID người dùng từ token
      this.user.next(decodedToken.user);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    if (!token || !this.currentUserId) {
      return new Observable(observer => {
        observer.error('No token or user ID found');
      });
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.authUrl}/users/${this.currentUserId}`, { headers }).pipe(
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

  logout() {
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['/login']);
  }
}