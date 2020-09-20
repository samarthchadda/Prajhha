import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SubAdminService } from '../services/sub-admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  permissions = ['Trainings','Courses','Revenues','Faculties Scheduling'];
  id;
  subAdminPerm = [];

  subAdminData ={
    AdminId : null,
    AdminPassword:'',
    Permissions:[]
  };

  subAdminInfo ={
    adminId : null,
    password:'',
    permissions:[]
  };


  constructor(private route:ActivatedRoute,private subAdminService:SubAdminService,private routerBtn:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((newParams:Params)=>{
          this.id = newParams['adminID'];

          this.subAdminService.fetchSingleAdmin(this.id).subscribe(res=>{
            
          this.subAdminData = res["SubAdmin"];
          console.log(this.subAdminData);

          this.subAdminPerm = this.subAdminData.Permissions;
          this.subAdminData.Permissions = [];
          
      })
    });

  }

  onChange(checkBox:any)
  { 
    this.subAdminData.Permissions.push(checkBox.value);
  }


    // for uni selection of checkbox
    data(e, id: any) {
      if (e.target.checked === true) {
        this.subAdminData.Permissions.push(id);
      } else {
        for (let i = 0; i < this.subAdminData.Permissions.length; i++) {
          if (this.subAdminData.Permissions[i] === id) {
            this.subAdminData.Permissions.splice(i, 1);
          }
        }
      }
    }




  onSubmit(form:NgForm)
  {
    this.subAdminInfo.adminId = JSON.parse(this.id);
    this.subAdminInfo.password = form.value.password;
    this.subAdminInfo.permissions = this.subAdminData.Permissions;

    //saving changes to database
    this.subAdminService.editSubAdmin(this.subAdminInfo).subscribe(res=>{
      console.log(res);
      if(res["Status"]){
        window.alert(res["message"]);
        this.routerBtn.navigate(['/admin']);
      }
      else{
        window.alert("Error Occured");
      }
    })


  }

  deleteSubAdmin(id)
  { 
    console.log(id);
    //deleting sub-admin
    this.subAdminService.deleteAdmin({"id":+id}).subscribe(res=>{
      console.log(res);
      
     
    },err=>console.log(err));


  }


}
