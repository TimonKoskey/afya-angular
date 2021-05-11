import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { APIService } from '../../services/api/api.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authservice: AuthService,
    private apiservice: APIService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = this.authservice.getToken();
      const user = this.apiservice.getUser();
      if (token) {
          return true;
      } else {
        this.router.navigate(['/sign-in']);
      }
  }
}
