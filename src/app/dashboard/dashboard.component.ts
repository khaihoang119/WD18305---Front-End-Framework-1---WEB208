import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe(user => {
      console.log(user);
      this.currentUser = user;
    }, error => {
      console.error('Error fetching user info', error);
    }
  );
  }

}
