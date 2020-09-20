import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsInfo = [];
  // images = [];

  constructor(private newsService:NewsService, private routerBtn:Router) { }

  ngOnInit(): void {

    this.newsService.fetchAllNews().subscribe(res=>{
      this.newsInfo = res["AllNews"]; 
      
      // this.newsInfo.forEach(n=>{        
      //   n.Image = "https://prajhaapp.herokuapp.com/"+n.Image
      // })

      });
    }

    newNews()
    {
      this.routerBtn.navigate(['/news/create']);
    }

    editNews(id)
    {
      this.routerBtn.navigate(['/news/edit/'+id]);
    }

    deleteNews(id)
    {
      this.newsService.deleteNews({"id":+id}).subscribe(res=>{
        console.log(res);
        this.ngOnInit();
        
      })
     
    }

}
