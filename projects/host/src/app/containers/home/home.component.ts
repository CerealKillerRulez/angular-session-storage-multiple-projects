import { Component, OnInit } from '@angular/core';
import { AppDataModel } from 'projects/uikitlibrary/src/public-api';
import { CrossDomainStorageService } from 'uikitlibrary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public appData = <AppDataModel>{};

  constructor(
    private storage: CrossDomainStorageService
  ) {
  }

  ngOnInit(): void {
    this.appData = this.storage.getItem('appData');
  }  
}
