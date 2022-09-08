import { Injectable } from "@angular/core";
import { SelectItem } from "primeng/api";

@Injectable()
export class AppData {
    public backendUri: string = "";
    public contextUserId: number = 0;
    public contextUser: string = "";
    public stores: Array<SelectItem> = [];
  }