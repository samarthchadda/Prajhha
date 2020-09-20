import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-new-appoint-faculty',
  templateUrl: './new-appoint-faculty.component.html',
  styleUrls: ['./new-appoint-faculty.component.css']
})
export class NewAppointFacultyComponent implements OnInit {

  public facultyForm: FormGroup;

  constructor(private _fb: FormBuilder, private routerBtn:Router,private facultyService:FacultyService) { }

  ngOnInit(): void {

    this.facultyForm = this._fb.group({
  	 
  	  name:[''],
      phone:[''],
      password:[''],      
      fee:[''],  
      category:[''],  
      perShare:[''],        
      timeSlot: this._fb.array([this.initItemRows()])
    });

  }


  get formArr() {
    // return this.courseForm.get('content') as FormArray;
    return <FormArray>this.facultyForm.get('timeSlot');
  }

  initItemRows() {
    return this._fb.group({    
    startTime:[''],
    endTime:[''],    
    
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }


  onSubmit()
  {  
    console.log(this.facultyForm.value);  

        // saving data into database
        this.facultyService.postAppointFaculty(this.facultyForm.value).subscribe(res=>{
          console.log(res);
          if(res["status"]){
            window.alert("New Faculty Created");
            this.routerBtn.navigate(['/appoint-faculties']);
          }else{
            window.alert("Error Occured");
          }
        },err=>{
          console.log(err);
        })



  }



}
