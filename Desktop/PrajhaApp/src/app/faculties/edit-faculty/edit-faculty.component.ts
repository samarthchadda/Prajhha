import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.css']
})
export class EditFacultyComponent implements OnInit {

  //faculty ID
  phone;

  facultyData={
    Name:'',
    Password:'',
    Fees:null,
    Category:''
  };

  //for storing into database
  facultyInfo={
    name:'',
    phone:null,
    password:'',
    fee:null,
    category:''
  };

  constructor(private route:ActivatedRoute,private facultyService:FacultyService,private routerBtn:Router ) { }

  ngOnInit(): void {

      this.route.params.subscribe((newParams:Params)=>{
          this.phone = newParams['faculId'];

          this.facultyService.fetchSingleFaculty(this.phone).subscribe(res=>{
          
            this.facultyData = res["faculty"];
           
          })       
        });
  }

  onSubmit(form:NgForm)
  {
    //id
    this.facultyInfo.phone = JSON.parse(this.phone);

    this.facultyInfo.name = form.value.name;
    this.facultyInfo.password = form.value.password;
    this.facultyInfo.category = form.value.category;
    this.facultyInfo.fee = form.value.fee;
    console.log("Edited Data : ",this.facultyInfo);

    //saving data into database
    this.facultyService.editFaculty(this.facultyInfo).subscribe(res=>{
      console.log(res);
      if(res["Status"]){
        window.alert("Faculty Details Updated");
        this.routerBtn.navigate(['/faculties']);
      }
      else{
        window.alert("Error Occured");
      }
    })
    
  }

}
