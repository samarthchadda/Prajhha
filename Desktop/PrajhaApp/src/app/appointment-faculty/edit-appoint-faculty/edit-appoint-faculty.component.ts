import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-edit-appoint-faculty',
  templateUrl: './edit-appoint-faculty.component.html',
  styleUrls: ['./edit-appoint-faculty.component.css']
})
export class EditAppointFacultyComponent implements OnInit {

  facultyId:number;
  facultyData;

  public facultyForm: FormGroup;

  constructor(private _fb: FormBuilder,private route:ActivatedRoute, private routerBtn:Router,private facultyService:FacultyService) { }

  ngOnInit(): void {

    

    this.route.params.subscribe((newParams:Params)=>{
      this.facultyId = newParams['faculId'];

      this.facultyService.fetchSingleAppointFaculty(+this.facultyId).subscribe(res=>{
        
        this.facultyData = res["faculty"];
        console.log(this.facultyData);


        this.facultyForm = this._fb.group({
          
          facultyId:[this.facultyId],
          name:[''],
          phone:[''],
          password:[''],      
          fee:[''],  
          category:[''],  
          perShare:[''],        
          timeSlot: this._fb.array(this.facultyData.TimeSlot.map(slot=>this.initItemRows(slot)))
        });

      })

    })

  }

  
  get formArr() {
    // return this.courseForm.get('content') as FormArray;
    return <FormArray>this.facultyForm.get('timeSlot');
  }

  initItemRows(slot) {
    return this._fb.group({    
    startTime:[slot.startTime],
    endTime:[slot.endTime],    
    
    });
  }
  addNewRow(slot) {
    this.formArr.push(this.initItemRows(slot));
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }


  onSubmit()
  {  
    console.log(this.facultyForm.value);  

    this.facultyService.editAppointFaculty(this.facultyForm.value).subscribe(res=>{
        console.log(res);
        if(res["status"]){
            window.alert("Details Updated");
            this.routerBtn.navigate(['/appoint-faculties']);
        }
    })



  }





}
