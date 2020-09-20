import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-show-courses',
  templateUrl: './show-courses.component.html',
  styleUrls: ['./show-courses.component.css']
})
export class ShowCoursesComponent implements OnInit {

  trainingId:number;
  categoryName;
  allCourses = [];
  constructor(private route:ActivatedRoute,
             private trainingService:TrainingService,
             private routerBtn:Router
             ) { }

  ngOnInit(): void {
 

    this.route.params.subscribe((newParams:Params)=>{
      this.trainingId = newParams['id'];

      this.trainingService.getSingleTraining(this.trainingId).subscribe(res=>{
        this.categoryName = res["Data"].trainingCategory;
      })

     
      this.trainingService.getCourseOfTraining(this.trainingId).subscribe(result=>{
        this.allCourses = result["courses"];
      })

    })
  }


  newCourse()
  {
    this.routerBtn.navigate(['/training/create/'+this.trainingId]);
  }

}
