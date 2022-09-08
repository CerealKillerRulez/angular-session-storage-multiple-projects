import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppDataModel, CrossDomainStorageService } from 'uikitlibrary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'remote1';
  private subs = new Subscription();
  public appData = <AppDataModel>{};
  
  constructor(
    private storage: CrossDomainStorageService
  ) {

  }
  
  public ngOnInit(): void {
    this.initSubscriptions();
    this.storage.setContainerWindow(window);
    this.storage.startListeningFromHost(); 
  }

  /** Aspetto che la remote abbia terminato il bind con l'host e caricato i dati nella sessionstorage per leggere i dati arrivati dall'host */
  initSubscriptions(): void {
    this.subs.add(
      this.storage.isHostBounded().subscribe(
        () => {
          console.log("Remote 1 host Bounded");
          this.appData = this.storage.getItem('appData');
        }
      )
    );
  }

  /** Unsubscribe di tutti gli observables */
  public ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.storage.unboundHost();
  }
}

