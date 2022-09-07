import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { ReportComponent } from './containers/report/report.component';
import { MenubarModule } from 'primeng/menubar';
import { UikitlibraryModule } from 'uikitlibrary';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReportComponent
  ],
  imports: [
    MenubarModule,
    BrowserModule,
    AppRoutingModule,
    UikitlibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
