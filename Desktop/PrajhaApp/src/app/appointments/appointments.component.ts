import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointmentsData = [];
  constructor(private appointService:AppointmentService) { }

  ngOnInit(): void {
    this.appointService.fetchAllAppointments().subscribe(res=>{
      this.appointmentsData = res["allAppointments"];
    })
  }

}
