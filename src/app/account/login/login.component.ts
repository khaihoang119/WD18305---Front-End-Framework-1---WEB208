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
  errorMessage: string = 'Đăng nhập thất bại'; // Biến để lưu trữ thông báo lỗi
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.errorMessage = '';
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.errorMessage = '';
    console.log('Submitting form', this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        success => {
          console.log('Login response', success);
          if (success) {
            this.router.navigate(['/dashboard']); // Điều hướng đến trang dashboard nếu đăng nhập thành công
          } else {
            this.errorMessage = 'Sai mật khẩu hoặc tài khoản'; // Thông báo khi đăng nhập sai
            this.loginForm.reset(); // Reset form
          }
        },
        error => {
          console.error('Login error', error);
          this.errorMessage = 'Đăng nhập thất bại'; // Thông báo khi có lỗi đăng nhập
          this.loginForm.reset(); // Reset form
        }
      );
    } else {
      console.log('Form is invalid'); // Xử lý khi form không hợp lệ
    }
  }
  
}
