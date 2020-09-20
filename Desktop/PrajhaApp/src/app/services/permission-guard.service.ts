import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService {

  constructor(private permService:PermissionService,private routerBtn:Router) { }

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

        // return this.permService.isAuthenticated()
        //     .then((authenticated:boolean)=>{
        //       if(authenticated)
        //       {
        //         return true;
        //       }else{
        //         this.routerBtn.navigate(['/']);
        //         return false;
        //       }
        //     })
        return false;
  }


}
