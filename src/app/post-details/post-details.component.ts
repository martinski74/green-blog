import { Component, OnInit } from '@angular/core';
import { Post, PostResolved } from '../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  pageTitle = 'Post Detail';
  post :Post
  errorMessage: string;
  private editForm: FormGroup

  
  constructor(private router: ActivatedRoute,
     private route: Router,
     private postService: PostsService,
     private formBuilder: FormBuilder
     ) { }

  ngOnInit(): void {
   
    let postId = localStorage.getItem("editPostId")
    if (!postId) {
      alert('Invalid Action')
      this.route.navigate(['/home'])
      return
    }
    this.editForm = this.formBuilder.group({
      id:[],
      title: ['', Validators.required],
      body:['', Validators.required],
      author:['', Validators.required],
      date: Date.now(),
      likeCounter:0
  
    })
    
    this.postService.getPostById(+postId)
    .subscribe(data => {
      this.editForm.setValue(data)
      this.post = data
    })
    
  }

  
  
  onBack(){
    this.route.navigate(['home'])
  }

}
