import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubAdminService } from '../services/sub-admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  subAdminInfo = [];

  constructor(private subAdminService:SubAdminService, private routerBtn:Router) { }

  ngOnInit(): void {

    this.subAdminService.fetchAllSubAdmins().subscribe(res=>{
      this.subAdminInfo = res["SubAdmins"];
    })


  }

  goToEdit(id:number)
  {
    this.routerBtn.navigate(['/admin/edit/'+id]);
  } 

 

  newSubAdmin()
  {
    this.routerBtn.navigate(['/admin/create']);
  }

  deleteSubAdmin(id)
  {

  console.log(id);
    //deleting sub-admin
    this.subAdminService.deleteAdmin({"id":+id}).subscribe(res=>{
      console.log(res);
      this.ngOnInit();
     
    },err=>console.log(err));

  }

}
