import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavigationService } from 'src/app/core/services';
import { AuthService } from '../services';




@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private navigationService: NavigationService, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    if (!currentUser?.accessToken) {
      // logged in so return true
      return true;
    }
    this.navigationService.homePage();
    // not logged in so redirect to login page with the return url
    return false;
  }
}
