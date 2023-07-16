import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyViewComponent, FooterViewComponent } from './components';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];


@NgModule({
  declarations: [
       HeaderViewComponent,
       BodyViewComponent,
       FooterViewComponent,
       HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class HomeModule { }
