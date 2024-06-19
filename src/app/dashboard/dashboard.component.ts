import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
   

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe(user => {
      this.user = user;
    });
  }
 
}
