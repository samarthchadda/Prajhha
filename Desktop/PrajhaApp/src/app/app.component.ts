import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'PrajhaApp';

  permissions=[];
  allowTraining:boolean;
  allowAdmin:boolean;
  allowCourses:boolean;
  allowFaculties:boolean;
  allowRevenue:boolean;
  allowNews:boolean;
  allowAppoint:boolean;
  allowSubAdmin:boolean;
  

  login = false;
  constructor(private authService:AuthService)
  {}

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  adminUser:boolean=false;
  ngOnInit()
  { 
    
      this.authService.userLoggedIn.subscribe(res=>{
       this.login = res;

       this.authService.adminMode.subscribe(res=>{
         console.log("Admin mode : ", res);

         if(res)
         {
  
          this.adminUser = true;
          console.log("Admin modeee");
          this.allowCourses = true;
          this.allowTraining = true;
          this.allowRevenue = true;
          this.allowFaculties = true;
          this.allowAppoint = true;
          this.allowNews = true;
          this.allowSubAdmin = true;
          
            
  
         }
         else{
        
         this.permissions = JSON.parse(localStorage.getItem('permissions'));
        
  
          this.authService.userPermissions.subscribe(res=>{
            console.log("B S :",res);
            this.permissions = res;
           
            this.permissions.forEach(per=>{
              if(per=="Courses"){
                this.allowCourses = true;
              }
              if(per=="Trainings"){
                this.allowTraining = true;
              }
              if(per=="Coaches Scheduling"){
                this.allowFaculties = true;
              }
              if(per=="Revenues"){
                this.allowRevenue = true;
              }
              if(per=="Admins"){
                this.allowSubAdmin = true;
              }
              if(per=="News"){
                this.allowNews = true;
              }
              if(per=="Appointments"){
                this.allowAppoint = true;
              }
              
          })
  
          })
        }


       })     
     

      })
      

  }

  logoutAdmin()
  {
      this.authService.logout();
      this.authService.userPermissions.next([]);
      localStorage.setItem('userType',null);
      window.location.reload();
      
  }

  onTraining()
  {
    if(!this.allowTraining)
    {
      window.alert("Permission Denied");
     
    }
  }

  onCourse()
  {
    if(!this.allowCourses)
    {
      window.alert("Permission Denied");
     
    }
  }

  onFaculty()
  {
    if(!this.allowFaculties)
    {
      window.alert("Permission Denied");
     
    }
  }
  onRevenue()
  {
    if(!this.allowRevenue)
    {
      window.alert("Permission Denied");
     
    }

  }

  onSubAdmin()
  {
    if(!this.allowSubAdmin)
    {
      window.alert("Permission Denied");
     
    }

  }

  onNews()
  {
    if(!this.allowNews)
    {
      window.alert("Permission Denied");
     
    }

  }

  onAppoint()
  {
    if(!this.allowAppoint)
    {
      window.alert("Permission Denied");
     
    }

  }


}
