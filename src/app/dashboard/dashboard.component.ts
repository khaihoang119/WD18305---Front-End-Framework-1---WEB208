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
    this.authService.currentUser.subscribe(user => {
      console.log('Current User:', user);  // Kiểm tra đối tượng người dùng ở đây
      if (user) {
        this.user = user;
      } else {
        this.authService.getUserInfo().subscribe(userInfo => {
          console.log('Fetched User Info:', userInfo);  // Kiểm tra thông tin người dùng nhận được
          this.user = userInfo;
        });
      }
    });
  }
 
}
