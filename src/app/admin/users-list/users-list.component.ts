import { Component, OnInit } from '@angular/core';
import { AdminAPIService } from '../admin-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  recordsAvailable: boolean;
  currentUser: any;
  users: Array<any> = [];

  constructor(
    private adminService: AdminAPIService,
    private router: Router,
    private route: ActivatedRoute
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

  blockUser(user: any) {
    const updateData = {
      'is_blocked' : true
    }
    this.adminService.blockUser(user.id, updateData).subscribe(results => {
      user['is_blocked'] = true;
    });
  }

  unblockUser(user: any) {
    const updateData = {
      'is_blocked' : false
    }
    this.adminService.unblockUser(user.id, updateData).subscribe(results => {
      user['is_blocked'] = false;
    });
  }

  deleteUser(user: any, index: number) {
    this.adminService.deleteUserData(user.id).subscribe(()=> {
      this.users.splice(index, 1);
    });
  }

}
