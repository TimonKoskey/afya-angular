import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { APIService } from '../../services/api/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  logFormSubmitted = false;
  loginError: string;
  user: any;
  fetchDataError: HttpErrorResponse;
  logStateConfirmedFalse = false;
  loginForm: NgForm;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private authservice: AuthService,
    private apiservice: APIService
  ) { }

  ngOnInit() {}

  onSubmit(loginForm: NgForm) {
    this.logFormSubmitted = true;
    this.loginError = undefined;
    this.loginForm = loginForm;
    if (loginForm.valid) {
      this.spinner.show();
      this.authservice.loginUser(this.username, this.password).subscribe(results => {
        this.spinner.hide();
        const token = results['token'];
        this.authservice.saveToken(token);
        this.authservice.getUserData().subscribe(results => {
          this.user = results;
          this.apiservice.setUser(this.user);
          this.router.navigate(['/account']);
        }, error => {
          console.error(error);
        });
      }, error => {
        this.spinner.hide();
        this.fetchDataError = error;
        console.error(this.fetchDataError);
      });
    }
  }

  retry() {
    this.fetchDataError = undefined;
    this.logFormSubmitted = false;
  }

}
