import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string;
  role: string = "1";
  email: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register({ name: this.name, role: this.role, email: this.email, password: this.password }).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      err => {
        this.error = 'Đăng ký thất bại!'; // Update error message
      }
    );
  }
}