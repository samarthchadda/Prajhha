import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  newsData = {
    NewsId:null,
    NewsContent:'',
    Image: ''
  };



  url:string = '';
  urlSafe: SafeResourceUrl;
  id:number;
  newsImage;
  constructor(private route:ActivatedRoute,private newsService:NewsService,public sanitizer: DomSanitizer,private routerBtn:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((newParams:Params)=>{
        this.id = newParams['id'];

        this.newsService.fetchSingleNews(this.id).subscribe(res=>{
            
            this.newsData = res["news"];
            // console.log(this.newsData);
            this.url = this.newsData.Image;
            this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

        })
    })
  }

  selectImage(event)
  {
 
    const file = event.target.files[0];
    this.newsImage = file;
    // console.log("News Image : ",this.newsImage);
  }

  onSubmit(form:NgForm)
  {

    const formData = new FormData();   
    
    formData.append('newsId',this.id.toString());    
    formData.append('content',form.value.content);
    formData.append('newsImage',this.newsImage);
    
    // console.log(formData);

    this.newsService.editNews(formData).subscribe(result=>{
      console.log(result);
       if(result["status"]){
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
