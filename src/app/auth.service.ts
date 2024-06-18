import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class AuthService {
  private authUrl = environment.url;

  login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
          // Redirect the user to the home page
          this.router.navigate(['/']);
          return true;
        }
        return false;
      })
    );
  }


  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.authUrl}/userinfo`, { headers });
  }

  constructor(private http: HttpClient, private router: Router) { }
  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

}
