import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';

@NgModule({
  declarations: [ProfileDashboardComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class ProfileModule { }
