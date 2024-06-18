import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  isAlert : boolean = false;
  error: string;
  users: any[];
  isLoading = false;
  user = { name: '', species: '', age: '' };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.isLoading = true;
    this.userService.getAll().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        if (error.status === 404) {
          this.error = "Lỗi không tìm thấy";
        } else {
          console.log(error);
          this.error = "Lỗi server " + error.message;
        }
      }
    );
  }

  editUser(_id: string) {
    this.router.navigate(['/edit-user', _id]);
  }

  onDelete(_id: string) {
    this.userService.delete(_id).subscribe(
      (data: any) => {
        this.isAlert = true;
        this.fetchAllUsers();
      },
      (error) => {
        alert("Lỗi xóa" + error);
      }
    );
  }

}
