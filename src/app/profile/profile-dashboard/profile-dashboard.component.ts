import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminAPIService } from 'src/app/admin/admin-api.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.css']
})
export class ProfileDashboardComponent implements OnInit {

  user: any;
  userCopy: any;
  userForm: FormGroup;
  editUserDetails = false;
  editPassword = false;
  userFormSubmitted: boolean;

  currentPassword: string;
  currentPasswordSubmitted: boolean;
  currentPasswordError: any;

  enterNewPassword = false;
  newPasswordSubmitted: boolean;
  newPasswordError: any;
  newPassword: string;
  newPasswordConfirm: string;

  constructor(
    private apiservice: APIService,
    private fb: FormBuilder,
    private adminService: AdminAPIService,
  ) { }

  ngOnInit(): void {
    this.user = this.apiservice.getUser();
  }

  initForm() {
    this.userForm = this.fb.group({
      first_name : [this.user.first_name, Validators.required],
      last_name : [this.user.last_name, Validators.required],
      username : [this.user.username, Validators.required],
      email : [this.user.email, Validators.required]
    })

    this.editUserDetails = true;
    this.userCopy = this.user;
  }

  cancelEditUserDetails() {
    this.user = this.userCopy;
    this.editUserDetails = false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value
      this.adminService.updateUser(this.user.id, newUser).subscribe(results => {
        this.user = results;
        this.editUserDetails = false;
      })

    }
  }

  changePassword() {
    this.editPassword = true;
  }

  submitCurrentPassword() {

    this.currentPasswordSubmitted = true;

    if (this.currentPassword !== '' && this.currentPassword !== undefined) {

      const data = {
        currentPassword: this.currentPassword
      }

      this.adminService.checkCurrentPassword(data).subscribe(() => {
        this.currentPasswordSubmitted = false;
        this.currentPasswordError = undefined;
        this.enterNewPassword = true;
      }, error => {
        console.log(error.message)
        this.currentPasswordError = 'Password Error';
      })

    }

  }

  submitNewPassword() {
    this.newPasswordSubmitted = true;
    if (this.newPassword !== '' && this.newPassword !== undefined) {
      if (this.newPassword === this.newPasswordConfirm) {

        const data = {
          newPassword: this.newPassword
        }

        this.adminService.changePassword(data).subscribe(results => {
          this.user = results;
          this.enterNewPassword = false;
          this.editPassword = false;
          this.currentPassword = undefined;
          this.newPassword = undefined;
          this.newPasswordConfirm = undefined;
          this.newPasswordError = undefined;
          this.currentPasswordError = undefined;
        }, error => {
          console.log(error.message)
        });

      } else {
        this.newPasswordError = 'Password do not match'
      }
    }
  }

  cancelEditPassword() {
    this.enterNewPassword = false;
    this.editPassword = false;
    this.currentPassword = undefined;
    this.newPassword = undefined;
    this.newPasswordConfirm = undefined;
    this.newPasswordError = undefined;
  }

  get first_name() {return this.userForm.get('first_name');}
  get last_name() {return this.userForm.get('last_name');}
  get username() {return this.userForm.get('username');}
  get email() {return this.userForm.get('email');}

}
