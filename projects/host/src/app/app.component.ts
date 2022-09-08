import { Component, OnInit } from '@angular/core';
import { AppDataModel, CrossDomainStorageService, MenuItem } from 'uikitlibrary';
import { REMOTE_APP_TYPE } from './enums/REMOTE_APP_TYPE';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public items = <MenuItem[]>[];

  constructor(
    private storage: CrossDomainStorageService
  ) {
  }

  ngOnInit(): void {
    this.initAppData();
    this.initMenuItems();
  }


  /** Inizializza i dati di contesto che verranno letti dalle app remote */
  private initAppData(): void {
    this.storage.setItem('appData', {
        userid: 100,
        username: 'a.galli',
        stores: [<MenuItem>{id: '405', label: 'Abbiategrasso'}]
    });
  }


  /** Inizializza la struttura del menu principale */
  private initMenuItems(): void {
    this.items = [
      {
        label: 'Host Home',
        icon: 'pi pi-fw pi-home',
        routerLink: "home"
      },      
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink:"dashboard"
      },   
      {
        label: 'Reports',
        icon: 'pi pi-fw pi-file-pdf',
        routerLink:"reports"
      },                
      {
          label: 'Remote 1',
          icon: 'pi pi-fw pi-briefcase',
          routerLink: `remoteloader/${REMOTE_APP_TYPE.REMOTE1}`
      },
      {
          label: 'Remote 2',
          icon: 'pi pi-fw pi-car',
          routerLink: `remoteloader/${REMOTE_APP_TYPE.REMOTE2}`
      }
    ];
  }

}
