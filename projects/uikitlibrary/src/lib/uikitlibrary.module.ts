import { NgModule } from '@angular/core';
import { StorageService } from '../public-api';
import { SessionStorageService } from '../public-api';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [{ provide: StorageService, useClass: SessionStorageService }],
})
export class UikitlibraryModule { }
