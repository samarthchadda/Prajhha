//This auth-guard is technically a service

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements  CanActivate {

  constructor(private service:AuthService, private router:Router)
  {

  }
  canActivate(route:ActivatedRouteSnapshot, router:RouterStateSnapshot) : boolean | Promise<boolean> | Observable<boolean|UrlTree>
  {
        //  this.service.userLoggedIn.subscribe(res=>{
        //       if(res)
        //       {
        //         return true;
        //       }
        //       else{
        //         this.router.navigate(['/login']);
        //         return false;
        //       }
        //  })

        return this.service.isAuthenticated()
            .then((authenticated:boolean)=>{
              if(authenticated)
              {
                return true;
              }else{
                this.router.navigate(['/login']);
                return false;
              }
            })
  }
   
}



