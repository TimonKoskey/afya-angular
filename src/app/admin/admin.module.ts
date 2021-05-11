import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminAPIService } from './admin-api.service';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponentComponent } from './user-details-component/user-details-component.component';
import { AddUserComponent } from './add-user/add-user.component';



@NgModule({

  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    UsersListComponent,
    UserDetailsComponentComponent,
    AddUserComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers : [AdminAPIService]
})
export class AdminModule { }
