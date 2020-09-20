import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  public courseForm: FormGroup;

  constructor(private _fb: FormBuilder, private courseService:CoursesService,private routerBtn:Router) { }
  
  image;

  ngOnInit(): void {

    this.courseForm = this._fb.group({
  	 
  	  name:[''],
      description:[''],
      fees:[''],      
      coursePhoto:[''],
      content: this._fb.array([this.initItemRows()])
    });

  }

  get formArr() {
    // return this.courseForm.get('content') as FormArray;
    return <FormArray>this.courseForm.get('content');
  }

  initItemRows() {
    return this._fb.group({
    ChapterName:[''],
    CourseLink:[''],
    CourseFile:[null]
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
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


  courseMainImage;
  selectImage1(event)
  {
    const file = event.target.files[0];    
    this.courseFile = file;    
    const formData = new FormData();   
    formData.append('courseImg',this.courseFile);

    this.courseService.postFile(formData).subscribe(result=>{
      
      this.courseMainImage = result["imageUrl"].location;
     
    },err=>console.log(err))
   
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

    this.courseForm.patchValue({
      coursePhoto:this.courseMainImage
    });

      
    let i =0;

    this.courseForm.value.content.forEach((item) => {
      item["CourseFile"] = this.allFiles[i]
      i++;
      })

   
  
    console.log(this.courseForm.value);  

    // saving data into database
    this.courseService.postCourse(this.courseForm.value).subscribe(res=>{
      console.log(res);
      if(res["status"]){
        window.alert(res["message"]);
        this.routerBtn.navigate(['/course']);
      }else{
        window.alert("Error Occured");
      }
    },err=>{
      console.log(err);
    })

  }


}
