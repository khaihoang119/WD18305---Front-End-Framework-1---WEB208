import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string;
  userForm: FormGroup;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Get the user ID from route parameters
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      // Fetch user details based on the ID
      this.get(this.userId);
    });
  }

  // Fetch user details by ID
  get(id: string) {
    this.userService.get(id).subscribe(
      (data: any) => {
        this.user = data;
        this.userForm.patchValue({
          name: this.user.name,
          password: this.user.password
        });
      },
      error => {
        console.log('Error fetching user details:', error);
      }
    );
  }

  edit() {
    if (this.userForm.invalid) {
      return;
    }

    const editedUser = { ...this.user, ...this.userForm.value };

    this.userService.edit(this.userId, editedUser).subscribe(
      (data: any) => {
        alert('Cập nhật thành công:' + data);
        this.router.navigate(['/list-user']);
      },
      error => {
        alert('Cập nhật thất bại:' + error);
      }
    );
  }
}
