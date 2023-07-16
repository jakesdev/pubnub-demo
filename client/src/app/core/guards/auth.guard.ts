import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from 'src/app/core/services';
import { AuthService } from '../services';





@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private navigationService: NavigationService, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.navigationService.loginPage();
    return true;
  }
}
