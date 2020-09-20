import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TrainingService } from 'src/app/services/training.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent implements OnInit {

  courseCode;
  trainingCode;

  allFaculties = [];
  allFacName = [];

  selectedDays = [];

  days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  //creating JS object for training
  trainingData = {   
    trainingId:null,
    courseCode:null,
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
      timings:'',            
    }
    
  }

  trainingInfo = {
    code:null,
    trainingID:'',
    name:'',
    description:'',
    method:'',
    fees:null,
    faculty:'',
    schedule:{
      sessionName:'',
      totalSessions:null,
      weeklySessions:null,
      availDay:[],
      timings:''          
    }

  }

  
  constructor(private route:ActivatedRoute,
              private trainingService:TrainingService,
              private facultyService:FacultyService,
              private routerBtn:Router
              ) { }

  ngOnInit(): void {

    this.route.params.subscribe((newParams:Params)=>{
        this.courseCode = newParams['code'];

        this.trainingService.getCourseOfTrainingByCrCode(this.courseCode).subscribe(result=>{
       
          this.trainingData = result["course"];
          this.trainingCode = result["course"].trainingId;
          console.log(this.trainingData)
          
          this.selectedDays = this.trainingData.schedule.availDay;

          this.trainingData.schedule.availDay =[];


          this.facultyService.fetchAllFaculties().subscribe(result=>{
            this.allFaculties = result["AllFaculties"];
           
              this.allFaculties.forEach(fac=>{
                this.allFacName.push(fac.Name);
              })

              console.log(this.allFacName);


          })

        })
       
    })
    

  }

  
  onChange(checkBox:any)
  { 
    this.trainingData.schedule.availDay.push(checkBox.value);
  }

  
   // for uni selection of checkbox
   data(e, id: any) {
    if (e.target.checked === true) {
      this.trainingData.schedule.availDay.push(id);
    } else {
      for (let i = 0; i < this.trainingData.schedule.availDay.length; i++) {
        if (this.trainingData.schedule.availDay[i] === id) {
          this.trainingData.schedule.availDay.splice(i, 1);
        }
      }
    }
  }

 
  onSubmit(form:NgForm)
  {  
   
    //trainingInfo for posting to server
    this.trainingInfo.code = JSON.parse(this.trainingData.courseCode);
    this.trainingInfo.trainingID = JSON.parse(this.trainingCode);
    this.trainingInfo.name = this.trainingData.name;
    this.trainingInfo.description = this.trainingData.description;
    this.trainingInfo.method = this.trainingData.method;
    this.trainingInfo.fees = this.trainingData.fees;
    this.trainingInfo.faculty = form.value.faculty;
    this.trainingInfo.schedule.sessionName = this.trainingData.schedule.sessionName;
    this.trainingInfo.schedule.totalSessions = this.trainingData.schedule.totalSessions;
    this.trainingInfo.schedule.weeklySessions = this.trainingData.schedule.weeklySessions;
    this.trainingInfo.schedule.timings = this.trainingData.schedule.timings;
    this.trainingInfo.schedule.availDay = this.trainingData.schedule.availDay;

    console.log(this.trainingInfo);
       
    
    //saving changes to database
    this.trainingService.editCourseOfTraining(this.trainingInfo).subscribe(res=>{
     
        if(res["status"])
        {
          window.alert(res["message"]);
          this.routerBtn.navigate(['/training/show-courses/'+this.trainingCode]);
        }
        else{
          window.alert("Error Occured");
        }
      
    })

  

  }
}
