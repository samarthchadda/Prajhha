import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  courseId:number;
  courseData = {
    CourseID:null,
    CourseName:'',
    Description:'',
    Fees:null,
    Content:null
  }

 

  public courseForm: FormGroup;

  constructor(private _fb: FormBuilder,private route:ActivatedRoute,private courseService:CoursesService) { }

  ngOnInit(): void {

    this.route.params.subscribe((newParams:Params)=>{
        this.courseId = newParams['code'];

        this.courseService.fetchSingleCourse(this.courseId).subscribe(res=>{
            // console.log(res["data"]);
            this.courseData = res["data"];
            console.log(this.courseData);

            this.courseForm = this._fb.group({
              courseId:[+this.courseId],
              name:[''],
              description:[''],
              fees:[null],      
              // content: this._fb.array([this.initItemRows()])
              content: this._fb.array(this.courseData.Content.map(cont=>this.initItemRows(cont)))
              
            });

        })
    });

   

  }

  
  get formArr() {
    // return this.courseForm.get('content') as FormArray;
    return <FormArray>this.courseForm.get('content');
  }

  initItemRows(cont):FormGroup {
    return this._fb.group({
    ChapterName:[cont.ChapterName],
    CourseLink:[cont.CourseLink],
    CourseFile:[null]
    });
  }
  addNewRow(cont) {
    this.formArr.push(this.initItemRows(cont));
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }


  courseFile;
  selectImage(event)
  {
    
    const file = event.target.files[0];
    
    this.courseFile = file;
    // console.log(" Course File: ",this.courseFile);
    this.storeFile();
   
  }

  allFiles = [];

  storeFile()
  {
    const formData = new FormData();   
    formData.append('courseImg',this.courseFile);

    this.courseService.postFile(formData).subscribe(result=>{
      // console.log(result["imageUrl"].location);
      this.allFiles.push(result["imageUrl"].location);
      console.log(this.allFiles);
    },err=>console.log(err))
  }


  onSubmit()
  {
    console.log("Submit : ",this.allFiles);
      
    let i =0;

    this.courseForm.value.content.forEach((item) => {
      item["CourseFile"] = this.allFiles[i]
      i++;
      })   
  
    console.log(this.courseForm.value);  

      
    //saving data into database
    this.courseService.editCourse(this.courseForm.value).subscribe(res=>{
      console.log(res);
    })

  }
}
