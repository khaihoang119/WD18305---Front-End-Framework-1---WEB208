import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  private authUrl = environment.url;
  getToken() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private router: Router) { }
  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

}
