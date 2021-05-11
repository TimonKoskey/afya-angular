import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAPIService } from '../admin-api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  userFormSubmitted: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private adminService: AdminAPIService,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
      email : ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value
      newUser['username'] = `${newUser.first_name}`.toLocaleLowerCase();
      this.adminService.addUser(newUser).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })

    }
  }

  get first_name() {return this.userForm.get('first_name');}
  get last_name() {return this.userForm.get('last_name');}
  get email() {return this.userForm.get('email');}

}
