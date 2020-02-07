import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/static/login/login.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['dashboard']);


const routes:Routes = [
  { path:'login', component:LoginComponent ,  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems  } },
  { path:'dashboard', component:DashboardComponent ,  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin  }  },
  { path:'**', pathMatch:'full', redirectTo:'login' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutesModule { }
