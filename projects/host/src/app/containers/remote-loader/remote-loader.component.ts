import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'projects/host/src/environments/environment';
import { Subscription } from 'rxjs';
import { MenuItem, CrossDomainStorageService } from 'uikitlibrary';
import { REMOTE_APP_TYPE } from '../../enums/REMOTE_APP_TYPE';

@Component({
  selector: 'app-remote-loader',
  templateUrl: './remote-loader.component.html',
  styleUrls: ['./remote-loader.component.scss']
})
export class RemoteLoaderComponent implements OnDestroy, OnInit, AfterViewInit {
  private remoteTypeToLoad = REMOTE_APP_TYPE.REMOTE1;
  public remoteSrc: SafeResourceUrl | undefined;
  private subs = new Subscription();
  @ViewChild('remoteapploader') remoteapploader: ElementRef =<ElementRef>{};
  
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private crossDomain: CrossDomainStorageService
  ) {
  }
  
  ngOnInit(): void {
    this.getParameters();
  }


  ngAfterViewInit(): void {
    this.crossDomain.setContainerWindow(this.remoteapploader.nativeElement.contentWindow);
    this.postAppDataToRemoteApp();
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();    
  }


  /** Aspetta che la remote sia caricata nel frame e fa una post dei dati tramite iframe
   *  il timeout è un porkaround per assicurarci che l'iframe abbia finito l'init della remote.
   *  Se non dovesse funzionare bisogna creare un meccanismo di callback tramite una postmessage da remote ad host
   */
  private postAppDataToRemoteApp(): void {
    setTimeout(() => {

      const valueToSend = {
        userid: 1,
        username: 'a.galli',
        stores: [<MenuItem>{id: '405', label: 'Abbiategrasso'}]
      };
  
      this.crossDomain.sendDataToRemote('appData', valueToSend);
      
    }, 1000);
  }


  /** Ottiene il parametro dal routing outlet, corrispondente al tipo di remote da caricare */
  private getParameters(): void {
    this.subs.add(
      this.route.params.subscribe(params => {
        this.remoteTypeToLoad = params['appname'] as REMOTE_APP_TYPE;
        this.loadRemoteApp();
      })
    ); 
  }


  /** Carica l'url associato al tipo di remote app nel catalogo */
  private loadRemoteApp(): void {
    const remoteToLoad = environment.remotesCatalog[this.remoteTypeToLoad];
    this.remoteSrc = this.sanitizer.bypassSecurityTrustResourceUrl(remoteToLoad);
  }
}
