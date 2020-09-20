import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-new-faculty',
  templateUrl: './new-faculty.component.html',
  styleUrls: ['./new-faculty.component.css']
})
export class NewFacultyComponent implements OnInit {

  facultyData={
    name:'',
    phone:null,
    password:'',
    category:'',
    fee:null
  };

  constructor(private facultyService:FacultyService,private routerBtn:Router) { }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm)
  {   
    
    this.facultyData.name = form.value.name;
    this.facultyData.phone = form.value.phone;
    this.facultyData.password = form.value.password;
    this.facultyData.category = form.value.category;
    this.facultyData.fee = form.value.fee;
   
  
    this.facultyService.postFaculty(this.facultyData).subscribe(res=>{
          console.log(res);
          if(res["Status"]){
            window.alert("New Faculty Created");
            this.routerBtn.navigate(['/faculties']);
          }
          else{
            window.alert("Error Occured");
          }
    },err=>{
      console.log(err);
    });   

  }

}
