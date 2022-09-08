import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ReportComponent } from './containers/report/report.component';
import { MenubarModule } from 'primeng/menubar';
import { UikitlibraryModule } from 'uikitlibrary';
import { RemoteLoaderComponent } from './containers/remote-loader/remote-loader.component';
import { HomeComponent } from './containers/home/home.component';
import { AppData } from './appdata';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReportComponent,
    RemoteLoaderComponent,
    HomeComponent
  ],
  imports: [
    MenubarModule,
    BrowserModule,
    AppRoutingModule,
    UikitlibraryModule
  ],
  providers: [
    { provide: AppData, useValue: (<any> window).APP_DATA },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
