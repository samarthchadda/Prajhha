import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http:HttpClient) { }

  fetchAllTrainings()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/alltrainings');
  }

  postTraining(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/post-training',data);
  }

  postCourseTraining(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/post-course-training',data);
  }


  getSingleTraining(code)
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/single-training/'+code);
  }

  edittraining(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/edit-training',data);
  }

  getCourseOfTraining(trainingID)
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-training-courses/'+trainingID); 
  }

  getCourseOfTrainingByCrCode(id)
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-trainingCourse/'+id);
  }

  editCourseOfTraining(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/edit-course-training',data);
  } 
  

}
