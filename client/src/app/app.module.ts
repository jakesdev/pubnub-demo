import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { errorInterceptorProvider, jwtInterceptorProvider } from './core/interceptors';
import { AppLoadService } from './core/services/app-load.service';


export function initializeApp(injector: Injector) {
  return (): Observable<any> | Promise<any> => {
    const appInitService = injector.get(AppLoadService);
    return appInitService.initApp();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    CoreModule.forRoot(),
  ],
  providers: [
    errorInterceptorProvider,
    jwtInterceptorProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ Injector ],
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
