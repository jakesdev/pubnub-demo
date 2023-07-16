import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { NavigationService } from './navigation.service';

@Injectable()
export class AppLoadService {
  protected httpClient: HttpClient;
  protected router: Router;
  protected apiService: ApiService;
  protected authService: AuthService;
  protected navigationService: NavigationService;

  public isLoading$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private injector: Injector) {
    this.httpClient = this.injector.get(HttpClient);
    this.router = this.injector.get(Router);
    this.apiService = this.injector.get(ApiService);
    this.authService = this.injector.get(AuthService);
    this.navigationService = this.injector.get(NavigationService);
  }

  initApp(): any {
    console.log(`app loaded successfully!! + ${moment(Date.now()).toISOString()}`);
  }

};
