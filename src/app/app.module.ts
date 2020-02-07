import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainHeaderComponent } from './components/static/main-header/main-header.component';
import { MainSideBarComponent } from './components/static/main-side-bar/main-side-bar.component';
import { MainFooterComponent } from './components/static/main-footer/main-footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoutesModule } from "./routes/routes.module";

import { HighchartsChartModule  } from "highcharts-angular";
import { ColumnComponent } from './components/highcharts/column/column.component';
import { PieComponent } from './components/highcharts/pie/pie.component';
import { BasicLineComponent } from './components/highcharts/basic-line/basic-line.component';

import { HttpClientModule } from "@angular/common/http";

//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/static/login/login.component';

//Forms
import { FormsModule } from "@angular/forms";





@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainSideBarComponent,
    MainFooterComponent,
    DashboardComponent,
    ColumnComponent,
    PieComponent,
    BasicLineComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HighchartsChartModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), 
    FormsModule,
    AngularFireAuthGuardModule,
    AngularFireAuthModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
