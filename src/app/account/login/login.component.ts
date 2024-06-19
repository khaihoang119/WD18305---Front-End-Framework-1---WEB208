import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log('Submitting form', this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(success => {
        console.log('Login response', success);
        if (success) {
          this.router.navigate(['/dashboard']); // Redirect to dashboard if login is successful
        } else {
          alert('Sai mật khẩu hoặc tài khoản');
          this.loginForm.reset(); // Reset the form
        }
      });
    } else {
      // Handle form errors here
      console.log('Form is invalid');
    }
  }
  
}
