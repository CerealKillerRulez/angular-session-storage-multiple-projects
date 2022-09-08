import { NgModule } from '@angular/core';
import { CrossDomainSessionStorageService } from './services/cross-domain-session-storage.service';
import { CrossDomainStorageService } from './services/cross-domain.storage.service';
@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [
    { provide: CrossDomainStorageService, useClass: CrossDomainSessionStorageService }
  ],
})
export class UikitlibraryModule { }
