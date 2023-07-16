import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdminGuard, AuthGuard } from './guards';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ApiService, AppInfoService, AuthService, NavigationService, ScreenService } from './services';
import { AppLoadService } from './services/app-load.service';






export const CORE_PROVIDERS = [
  AuthGuard,
  IsLoggedInGuard,
  AdminGuard,
  ApiService,
  AppLoadService,
  AuthService,
  ScreenService,
  AppInfoService,
  NavigationService,
];

export const CORE_MODULES = [ CommonModule, NgxPermissionsModule ];

@NgModule({
  imports: [ ...CORE_MODULES ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [ ...CORE_PROVIDERS ],
    };
  }
}
