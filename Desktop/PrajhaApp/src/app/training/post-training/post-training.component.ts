import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-post-training',
  templateUrl: './post-training.component.html',
  styleUrls: ['./post-training.component.css']
})
export class PostTrainingComponent implements OnInit {

  allFaculties = [];
  allFacName = [];
  

  constructor(private trainingService:TrainingService,private route:ActivatedRoute,
            private facultyService:FacultyService,private routerBtn:Router) { }

  days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  //creating JS object for training
  courseData = {
    trainingID:null,
    name:'',   
    description:'',
    method:'',
    fees:null,
    facultyName:'',
    schedule:{
      sessionName:'',
      totalSessions:null,
      weeklySessions:null,
      availDay:[],
      timings:''       
    }
    
  }
  

  ngOnInit(): void {
    
    this.route.params.subscribe((newParams:Params)=>{
        this.courseData.trainingID = +newParams['id'];
    })
    
    
    this.facultyService.fetchAllFaculties().subscribe(result=>{
      this.allFaculties = result["AllFaculties"];
     
        this.allFaculties.forEach(fac=>{
          this.allFacName.push(fac.Name);
        })

        console.log(this.allFacName);
      })



  }
 
 
   // for uni selection of checkbox
   data(e, id: any) {
    if (e.target.checked === true) {
      this.courseData.schedule.availDay.push(id);
    } else {
      for (let i = 0; i < this.courseData.schedule.availDay.length; i++) {
        if (this.courseData.schedule.availDay[i] === id) {
          this.courseData.schedule.availDay.splice(i, 1);
        }
      }
    }
  }

 
  onSubmit(form:NgForm)
  {
    
    this.courseData.name = form.value.name;   
    this.courseData.description = form.value.description;
    this.courseData.method = form.value.method;
    this.courseData.fees = form.value.fees;
    this.courseData.facultyName = form.value.facultyName;
    this.courseData.schedule.sessionName = form.value.sessionName;
    this.courseData.schedule.totalSessions = form.value.totalSessions;
    this.courseData.schedule.weeklySessions = form.value.weeklySessions;
    this.courseData.schedule.timings = form.value.srtTime.toString() + "-"+form.value.endTime.toString();
  
    console.log(this.courseData);


    this.trainingService.postCourseTraining(this.courseData).subscribe(res=>{
      console.log(res);
      if(res["status"]){
        window.alert("Course Created");
        this.routerBtn.navigate(['/training/show-courses/'+this.courseData.trainingID]);
      }
      else{
        window.alert("Error Occured");
      }
    })


  }

}
