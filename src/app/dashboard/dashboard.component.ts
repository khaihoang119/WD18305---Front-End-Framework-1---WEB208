import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { projectService } from '../project.service';
import { UserService } from '../user.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalBudget: number = 0;  // Tổng ngân sách của tất cả các dự án
  myBudget: number = 1000000000;  // Ngân sách của bạn
  remainingBudget: number = 0;  // Số dư còn lại
  user: any;
  totalUsers: number = 0;
  totalProjects: number = 0;
  totalTasks: number = 0;
  constructor(private authService: AuthService, private projectService: projectService,private userService: UserService, private taskService: TaskService) { }

  ngOnInit() {
    this.fetchTotalBudget();
    this.fetchTotalUsers();
    this.fetchTotalProjects();
    this.fetchTotalTasks();
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
  fetchTotalBudget() {
    this.projectService.getAllProject().subscribe(
      (data: any) => {
        this.totalBudget = this.projectService.calculateTotalBudget(data);
        this.calculateRemainingBudget();
      },
      (error) => {
        console.error("Lỗi khi lấy danh sách dự án", error);
      }
    );
  }
  calculateRemainingBudget() {
    this.remainingBudget = this.myBudget - this.totalBudget;
  }
  fetchTotalProjects() {
    this.projectService.getAllProject().subscribe(
      (data: any) => {
        this.totalProjects = this.projectService.countProjects(data);
      },
      (error) => {
        console.error("Lỗi khi lấy danh sách dự án", error);
      }
    );
  }
  fetchTotalUsers() {
    this.userService.getAll().subscribe(
      (data: any) => {
        this.totalUsers = this.userService.countUsers(data);
      },
      (error) => {
        console.error("Lỗi khi lấy danh sách người dùng", error);
      }
    );
  }
  fetchTotalTasks(){
    this.taskService.getAllTasks().subscribe(
      (data: any) => {
        this.totalTasks = this.taskService.countTasks(data);
      },
      (error) => {
        console.error("Lỗi khi lấy danh sách công việc", error);
      }
    );
  }
}