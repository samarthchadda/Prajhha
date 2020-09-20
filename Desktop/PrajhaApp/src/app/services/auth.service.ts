import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private routerBtn:Router) { 
    if(JSON.parse(localStorage.getItem('userData')))
    {
      this.userSub.next(JSON.parse(localStorage.getItem('userData')));
      this.userLoggedIn.next(true);
     
    }
  }

  userSub = new BehaviorSubject(null);
  userLoggedIn = new BehaviorSubject<boolean>(false);
  userPermissions = new BehaviorSubject<[]>([]);
  adminMode = new BehaviorSubject<boolean>(false);
  

  isAuthenticated()
  {
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.userLoggedIn);
      },2000);
    });
    return promise;
  }

  subAdminLogin(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/login-sub-admin',data);
  }


  adminLogin(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/admin-login',data);
  }

  adminSendMail(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/send-email',data);
  }

  admiForgotPwd(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/admin-forgotPwd',data);
  }


  logout()
  {
    this.userSub.next(null);
    this.userLoggedIn.next(false);
    localStorage.setItem('userData',null);
    this.routerBtn.navigate(['/login']);
    this.adminMode.next(false);
  }


}
