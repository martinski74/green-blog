import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { PostResolved } from './models/post.model'
import { PostsService } from './posts.service'

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<PostResolved> {
  constructor(private postService: PostsService) {}
  state: RouterStateSnapshot
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PostResolved> {
    const id = route.paramMap.get('id')

    if (isNaN(+id)) {
      const message = `Post id was not a number: ${id}`
      console.error(message)
      return of({ post: null, error: message })
    }

    return this.postService.getPostById(+id)
    .pipe(
        map(post => ({post: post})),
        catchError(error => {
            const message = `Retrival error: ${error}`
            console.error(message)
            return of({post: null, error :message})
        })
    )
  }
}
