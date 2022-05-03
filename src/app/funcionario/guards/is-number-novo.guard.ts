import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { canDeactivate as CD } from '../models/canDeactivate';


@Injectable()
export class IsNumberNovoGuard implements CanDeactivate<CD> {
  canDeactivate(
    component: CD,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return component.canDeActivate();
  }
}
