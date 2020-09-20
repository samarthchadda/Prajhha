import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAdminMode = true;
  forgotPwd = false;
  resetPassword = false;

  @ViewChild('username',{static:true}) email:ElementRef;
  @ViewChild('tokenName',{static:true}) tokenNm:ElementRef;
  @ViewChild('newPassword',{static:true}) newPwd:ElementRef;
  
  userEmail;

  constructor(private authService:AuthService,private routerBtn:Router,private permService:PermissionService) { }

  ngOnInit(): void {
  }

  onSwitchMode()
  {
    this.isAdminMode = !this.isAdminMode;
  }

  onSubmit(authForm:NgForm)
  {
    console.log(authForm.value);
    this.userEmail = authForm.value.id;

    let adminInfo = {
      email:'',
      password:''
    };

    if(this.isAdminMode)
    {
      console.log("Admin Mode");
      adminInfo.email = authForm.value.id;
      adminInfo.password = authForm.value.password;
      this.authService.adminLogin(adminInfo).subscribe(res=>{
        console.log(res);
        if(res["status"])
        {
          console.log("Admin Stored");
          this.authService.userSub.next(res["admin"]);
          this.authService.userLoggedIn.next(true);
          localStorage.setItem('userData',JSON.stringify(res["admin"]));
          localStorage.setItem('userType',"Admin");
          this.authService.adminMode.next(true);
          
          this.routerBtn.navigate(['/']);
        }
      })


    }else{
      console.log("Sub-Admin Mode");
      authForm.value.id = +authForm.value.id;
      this.authService.subAdminLogin(authForm.value).subscribe(res=>{
        console.log(res);
        if(res["status"])
        {
          console.log("SubAdmin Stored");
          this.authService.userSub.next(res["SubAdmin"]);
          console.log(res["SubAdmin"].Permissions);
          this.authService.userLoggedIn.next(true);
          localStorage.setItem('userData',JSON.stringify(res["SubAdmin"]));
          localStorage.setItem('permissions',JSON.stringify(res["SubAdmin"].Permissions));
          this.authService.userPermissions.next(res["SubAdmin"].Permissions);
          this.permService.userPermissions.next((res["SubAdmin"].Permissions));
          this.authService.adminMode.next(false);
          this.routerBtn.navigate(['/']);
         
        }
      })
    }

  }

  forgotPassword()
  {
    this.forgotPwd=true;
    console.log("Forgot Pwd");
    console.log(this.userEmail);
   
    
   
  }

  resetPwd(form:NgForm)
  {
    console.log(form.value);
    this.authService.admiForgotPwd(form.value).subscribe(res=>{
      console.log(res);
      if(res["status"]){
        window.alert("Password Changed....Login Now");
        this.ngOnInit();
        this.forgotPwd = false;
        this.routerBtn.navigate(['/login']);
        
      }else{
        window.alert("Error Occured");
      }

    })
    
  }

  sendEmail(form:NgForm)
  {
    console.log(form.value);
     this.authService.adminSendMail(form.value).subscribe(res=>{
      console.log(res);
      if(res["status"]){
        window.alert("Email Sent");
       
      }else{
        window.alert("Error Occured");
      }

    })

  }


}

