import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataModel, CrossDomainStorageService } from 'uikitlibrary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit, OnDestroy {
  title = 'remote2';
  private subs = new Subscription();
  public appData = <AppDataModel>{};
    
  constructor(
    private storage: CrossDomainStorageService
  ) {

  }
  
  public ngOnInit(): void {
    console.log('remote2: parte oninit');
    this.initSubscriptions();
    this.storage.setContainerWindow(window);
    this.storage.startListeningFromHost();
  }

  public ngAfterViewInit(): void {
    console.log('remote2: parte AfterViewInit');
  }

  initSubscriptions(): void {
    this.subs.add(
      this.storage.isHostBounded().subscribe(
        () => {
          console.log("Remote 2 host Bounded");
          this.appData = this.storage.getItem('appData');
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.storage.unboundHost();
  }
}

