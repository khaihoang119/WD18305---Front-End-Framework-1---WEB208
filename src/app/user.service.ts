import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
  private apiUrl = environment.url;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  create(userData: any): Observable<any> {
    console.log('Data to be sent:', userData);
    return this.http.post<any>(`${this.apiUrl}/users`, userData);
  }

  delete(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${_id}`);
  }

  edit(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, userData)
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
  countUsers(users: any[]): number {
    return users.length;
  }
}