import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Post } from './models/post.model';




@Injectable({
  providedIn: 'root'
})
export class PostsService {
 
  private postsUrl = "http://localhost:3000";
  private commentUrl = "http://localhost:3000/comments"
  private posts :Post[] = []
  isRead: false

  constructor(private http: HttpClient) { }

  createComment(post: Post): Observable<Post>{
    return this.http.post<Post>(this.commentUrl, post)
  }

  getComment(){
    return this.http.get(this.commentUrl)
  }

  createPost(post: Post): Observable<Post>{
    
    return this.http.post<Post>(this.postsUrl+ '/posts', post)
  }
  
  getPosts() {
    return this.http.get(this.postsUrl + '/posts')
  }
  getPostById(id: number){
    return this.http.get<Post>(this.postsUrl + '/posts/' + id)
  }
  
  deletePost(post){
    return this.http.delete(this.postsUrl + '/' + post.id)
    .subscribe(res => {
      let index = this.posts.indexOf(post)
      this.posts.splice(index,1)
    })
  }

  updatePost(post:Post){
    return this.http.put(this.postsUrl +'/posts/'+ post.id, post)
  }
  
}
