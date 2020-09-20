import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {


  trainingInfo = [];


  constructor(private trainingService:TrainingService,private routerBtn:Router) { }



  ngOnInit(): void {
    this.trainingService.fetchAllTrainings().subscribe(res=>{
         
      this.trainingInfo = res["AllTrainings"];

      // this.trainingInfo.forEach(t=>{
      //   console.log(t.Fees);
      // })
    })
  }

  newTraining()
  {
    this.routerBtn.navigate(['/training/new']);
  }

}
