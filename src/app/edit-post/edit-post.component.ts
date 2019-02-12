import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../models/post.model';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import swal from 'sweetalert'


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  isEdited: boolean = false
  private post :Post
 editForm: FormGroup

  constructor(private postService: PostsService,
     private router: Router,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    let postId = localStorage.getItem("editPostId")
    if (!postId) {
      alert('Invalid Action')
      this.router.navigate(['/home'])
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
    })
    
  }

  updatePost(){
   this.postService.updatePost(this.editForm.value)
   .pipe(first())
   .subscribe(data => {
     this.isEdited = true
     this.router.navigate(['/home'])
     swal("Good job!", "Successfully edited!", "success")
  
   },
   err => {
     alert(err)
   })
  }

}
