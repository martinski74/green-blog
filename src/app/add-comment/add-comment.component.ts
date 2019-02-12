import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  model: Post

  constructor(private postService: PostsService, private router: Router) {
    this.model = new Post()
    this.model.likeCounter = 0
   }

  ngOnInit() {
  }

  addComment(){
    this.model.id = null
    this.model.date = new Date().toDateString()
    this.postService.createComment(this.model).subscribe(res => {console.log(res)
    this.router.navigate(['home'])
    })
  }

}
