import { Component, OnInit } from '@angular/core';
import { RevenueService } from '../services/revenue.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {

  courseRevenues = [];
  appointRevenues = [];
  
  showCourseRev = true;

  constructor(private revenueService:RevenueService) { }

  ngOnInit(): void {

    this.revenueService.fetchAllCourseRevenue().subscribe(res=>{
    
      this.courseRevenues = res["revenues"];
      console.log(this.courseRevenues);
    });

    this.revenueService.fetchAllAppointRevenue().subscribe(res=>{
    
      this.appointRevenues = res["revenues"];
      console.log(this.appointRevenues);
    });


  }



  showCourse()
  {
    this.showCourseRev = true;
  }

  
  showAppoint()
  {
    this.showCourseRev = false;
  }

}
