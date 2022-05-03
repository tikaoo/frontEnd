import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface canDeactivate {
  canDeActivate():Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}
