import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  user: any;
   

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = this.authService.getToken(); // Get the token from AuthService
    const decodedToken = jwtDecode(token);
    console.log(decodedToken); // Log the decoded token
    this.user = decodedToken; 
    console.log(this.user);
    const id = this.user.id;
    console.log(id);
    
  }
 
}
