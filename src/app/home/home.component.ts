import { Component, OnInit, Input,  } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import swal from 'sweetalert'

import { AuthService } from '../authentication/auth.service';
import { debug } from 'util';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[PostsService]
})


export class HomeComponent implements OnInit {


  private postsUrl = "http://localhost:3000";
 posts :Post[] = []
  comment : Post[] = []
  likeUrl = '../../assets/new_facebook_like_640.png'
  commentUrl = '../../assets/comment.png'
  
  constructor(private http: HttpClient,
     private postService: PostsService
     , private router: Router,
     private  authService: AuthService) {
     this.postService.getPosts()
     .subscribe((res: any[]) =>{
       this.posts = res
       this.posts.reverse()
     })
     
   }

   addComment(){
     
     this.router.navigate(['/add-comment'])
   }

   delete(post){
     swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this post?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: true,
      },
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Your post has been deleted!", "success");
        this.http.delete(this.postsUrl+ '/posts/' + post.id)
        .subscribe(res => {
          let index = this.posts.indexOf(post)
          this.posts.splice(index,1)
        })
      }
    });
      
       
     
  }

  editPost(post: Post){
    localStorage.removeItem("editPostId")
    localStorage.setItem("editPostId",post.id.toString())
    this.router.navigate(['/edit-post'])
  
  }

  showDetails(post: Post){
    localStorage.removeItem("editPostId")
    localStorage.setItem("editPostId",post.id.toString())
    this.router.navigate(['/post-details'])
  }

  liked(post: Post){

    if (post.likeCounter < 1) {
      post.likeCounter++
    }
  }

  ngOnInit() {
    this.postService.getComment()
      .subscribe((data :any[]) =>{
        this.comment = data
        console.log(this.comment);
        
      })
  }
  

}
