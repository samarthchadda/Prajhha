import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {

  facultyInfo = [];
  constructor(private facultyService:FacultyService, private routerBtn:Router) { }

  ngOnInit(): void {

    this.facultyService.fetchAllFaculties().subscribe(result=>{
      this.facultyInfo = result["AllFaculties"];
    })

  }

  newFaculties()
  {
      this.routerBtn.navigate(['/faculties/new']);
  }

}
