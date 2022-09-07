import { Component, OnInit } from '@angular/core';
import { MenuItem, StorageService } from 'uikitlibrary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'host';
  public items = <MenuItem[]>[];

  constructor(public storage: StorageService) {}


  ngOnInit() {
    this.storage.setItem<string>("prova", "test");

    this.items = [
      {
          label: 'Remote 1',
          icon: 'pi pi-fw pi-plus',
          url:"https://localhost:4201"
      },
      {
          label: 'Remote 2',
          icon: 'pi pi-fw pi-pencil',
          url:"https://localhost:4202"
      }
    ];
  }

}
