import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  model: Post
  comment: Post

  constructor(private postService: PostsService, private router: Router) {
    this.model = new Post()
    this.model.likeCounter = 0
   }

  ngOnInit() {
  }

  create(){
   this.model.id = null
   this.model.date = new Date().toDateString()
   this.postService.createPost(this.model).subscribe(res => {
    this.router.navigate(['/home'])
    swal("Good job!", "Post created", "success")
   })
   
  }
}
