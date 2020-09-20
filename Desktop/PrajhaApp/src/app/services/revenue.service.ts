import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private http:HttpClient) { }


  fetchAllCourseRevenue()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/get-course-payment/');
  }

  
  fetchAllAppointRevenue()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/get-appoint-payment/');
  }




}
