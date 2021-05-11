import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAPIService } from '../admin-api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  recordsAvailable: boolean;
  users: Array<any> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminAPIService,
  ) { }

  ngOnInit(): void {
    this.adminService.getUserData().subscribe(results => {
      if (results.length === 0) {
        this.recordsAvailable = false;
      } else {
        this.users = results;
        this.recordsAvailable = true;
      }
    });
  }

  navToAddNewUser() {
    this.router.navigate(['../register-user'], { relativeTo: this.route });
  }

  blockUser(user: any) {
    const updateData = {
      'username' : user.username,
      'is_active' : false
    }
    this.adminService.blockUser(user.id, updateData).subscribe(results => {
      user['is_active'] = false;
    });
  }

  unblockUser(user: any) {
    const updateData = {
      'username' : user.username,
      'is_active' : true
    }
    this.adminService.unblockUser(user.id, updateData).subscribe(results => {
      user['is_active'] = true;
    });
  }

  deleteUser(user: any, index: number) {
    this.adminService.deleteUserData(user.id).subscribe(()=> {
      this.users.splice(index, 1);
    });
  }

}
