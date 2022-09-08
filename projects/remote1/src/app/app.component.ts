import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { CrossDomainStorageService } from 'uikitlibrary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'remote1';
  private subs = new Subscription();
  
  constructor(private crossDomain: CrossDomainStorageService) {

  }

  public ngOnInit(): void {
    this.crossDomain.setContainerWindow(window);
    this.crossDomain.startListeningFromHost();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

