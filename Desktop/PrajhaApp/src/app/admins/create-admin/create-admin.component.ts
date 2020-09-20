import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SubAdminService } from 'src/app/services/sub-admin.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  id:number;
  constructor(private subAdminService:SubAdminService,private routerBtn:Router) { }

  permissions = ['Trainings','Courses','Revenues','Coaches Scheduling','Admins','News','Appointments'];

  subAdminData ={
    adminId : null,
    password:'',
    permissions:[]
  };

  ngOnInit(): void {
   

    this.subAdminService.getCounter().subscribe(res=>{
      console.log(res);
      this.id = res["counter"];
    })

  }

  adminPerm = [];
  onChange(checkBox:any)
  { 
    // this.subAdminData.permissions.push(checkBox.value);
    this.adminPerm.push(checkBox.value);
  }


    // for uni selection of checkbox
    data(e, id: any) {
      if (e.target.checked === true) {
        this.adminPerm.push(id);
      } else {
        for (let i = 0; i < this.adminPerm.length; i++) {
          if (this.adminPerm[i] === id) {
            this.adminPerm.splice(i, 1);
          }
        }
      }
    }





  onSubmit(form:NgForm)
  {
    this.subAdminData.adminId = +form.value.adminId;
    this.subAdminData.password = form.value.password;     
  

    //saving only unique value in subAdminData's permission
    for(var i = 0;i<this.adminPerm.length;i++)
    {
      if(this.subAdminData.permissions.indexOf(this.adminPerm[i])===-1)
      {
          this.subAdminData.permissions.push(this.adminPerm[i]);
      }
    }

    console.log(this.subAdminData);


    //saving to database
    this.subAdminService.postSubAdmin(this.subAdminData).subscribe(res=>{
      console.log(res);
      if(res["Status"])
      {
        window.alert("New Sub-Admin Created");
        this.routerBtn.navigate(['/admin']);
      }else{
        window.alert("Error Occured");
      }
    })

  }

}
