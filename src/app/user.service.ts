import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable()
export class UserService {
  private authUrl = environment.url;
  constructor(private http: HttpClient) { }

  register(user: any) {
   
    return this.http.post(`${this.authUrl}/register`, user);
  }
}