import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  
  user: any = {
    id: '',
    name: '',
    password: '',
    email: '',
    role: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createUser() {
    this.userService.create(this.user).subscribe(
      (data: any) => {
     
        // alert("Thêm người dùng thành công" + data);
        this.router.navigate(['/list-user']);
       
      },
      (error: any) => {
        alert("Thêm thất bại" + error);
      }
    );
  }

  onSubmit() {
    this.createUser();
  }
}
