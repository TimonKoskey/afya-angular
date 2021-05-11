import { Component, OnInit } from '@angular/core';
import { AdminAPIService } from '../admin-api.service';

@Component({
  selector: 'app-user-details-component',
  templateUrl: './user-details-component.component.html',
  styleUrls: ['./user-details-component.component.css']
})
export class UserDetailsComponentComponent implements OnInit {
  userDetails: any

  constructor(
    private adminService: AdminAPIService
  ) { }

  ngOnInit(): void {
    this.userDetails = this.adminService.userDetails;
  }

}
