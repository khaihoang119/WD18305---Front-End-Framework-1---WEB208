import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { map,tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class AuthService {
  private authUrl = environment.url;
  private user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();

 

  login(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
         
          this.getUserInfo().subscribe();
            this.router.navigate(['/dashboard']);
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
    return this.http.get(`${this.authUrl}/users`, { headers }).pipe(
      tap((response: any) => {
        this.user.next(response);
        return response;
      })
    );
  }

 
  constructor(private http: HttpClient, private router: Router) { }
  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

}
