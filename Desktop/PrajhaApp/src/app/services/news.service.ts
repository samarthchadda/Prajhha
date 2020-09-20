import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }


  fetchAllNews()
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-news');
  }

  fetchSingleNews(id)
  {
    return this.http.get('https://prajhaapp.herokuapp.com/api/all-news/'+id);
  }

  postNews(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/post-news',data);
  }

  editNews(data)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/edit-news',data);
  }

  deleteNews(id)
  {
    return this.http.post('https://prajhaapp.herokuapp.com/api/delete-news',id);
  }

}
