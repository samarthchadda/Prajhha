import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }


  fetchAllAppointments()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-appointments');
  }

}
