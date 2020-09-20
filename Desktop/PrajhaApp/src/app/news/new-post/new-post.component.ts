import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {



  constructor(private newsService:NewsService,private http:HttpClient,private routerBtn:Router) { }


  newsImage;

  ngOnInit(): void {
  }

  selectImage(event)
  {
    const file = event.target.files[0];
    this.newsImage = file;
    console.log("News Image : ",this.newsImage);
  }

  

  onSubmit(form:NgForm)
  {
    
    const formData = new FormData();   
    formData.append('content',form.value.content);
    formData.append('newsImage',this.newsImage);
    
    console.log(formData);

    this.newsService.postNews(formData).subscribe(result=>{
      console.log(result);
      if(result["Status"]){
        window.alert(result["message"]);
        this.routerBtn.navigate(['/news']);
      }
      else{
        window.alert("Error Occured");
      }
    },err=>{
      console.log(err);
    });
  }

}
