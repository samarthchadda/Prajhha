import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubAdminService {
  
  id:number = 114;

  constructor(private http:HttpClient) { 

  }

  getCounter()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/subadmin-counter'); 
  }

  fetchAllSubAdmins()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-sub-admins');
  }

  fetchSingleAdmin(id)
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-sub-admins/'+id);
  }
 

  postSubAdmin(data)
  {   
    this.id+=1;

    return this.http.post('https://prajhaapp.herokuapp.com/api/post-sub-admin',data);
  }

  editSubAdmin(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/edit-subAdmin',data);
  }

  deleteAdmin(data)
  {
    console.log(data);
    return this.http.post('https://prajhaapp.herokuapp.com/api/delete-sub-admin',data);
  }

}
