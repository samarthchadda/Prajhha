import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  userPermissions = new BehaviorSubject<[]>([]);


  
  isAllowed()
  {
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.userPermissions);
      },2000);
    });
    return promise;
  }


}
