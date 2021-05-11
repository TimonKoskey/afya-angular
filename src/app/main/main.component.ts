import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { APIService } from '../services/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  user: any;
  poll: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private apiservice: APIService
  ) { }

  ngOnInit() {
    this.user = this.apiservice.getUser();
    this.poll = setInterval(() => {
      this.authservice.getUser(this.user.id).subscribe(results => {
        if (!results["is_active"]) {
          this.logout();
        }
      }, error => {
        console.error(error);
      });
    }, 5000);
  }

  navOneStepBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  logout() {
    this.authservice.removeDataFromSessionStorage();
    this.router.navigate(['/sign-in']);
  }

  home() {
    this.router.navigate(['/account']);
  }

  toUserProfile() {
    this.router.navigate(['/account/profile']);
  }

  ngOnDestroy() {
    if (this.poll) {
      clearInterval(this.poll);
    }
  }

}
