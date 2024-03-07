import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InscriptionService } from './services/inscription.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor (private inscriptionService: InscriptionService,
    private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.inscriptionService.isAdmin())
    return true;
    else
    {
    this.router.navigate(['app-forbidden']);
    return false;
    }
    }


 
   
  
}
