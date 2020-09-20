import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-appointment-faculty',
  templateUrl: './appointment-faculty.component.html',
  styleUrls: ['./appointment-faculty.component.css']
})
export class AppointmentFacultyComponent implements OnInit {

  appointFacultyInfo = [];

  constructor(private facultyService:FacultyService, private routerBtn:Router) { }

  ngOnInit(): void {

    
    this.facultyService.fetchAllAppointFaculties().subscribe(result=>{
      this.appointFacultyInfo = result["AllFaculties"];
      console.log(this.appointFacultyInfo);
    })

  }

  newFaculties()
  {
      this.routerBtn.navigate(['/appoint-faculties/new']);
  }


}
