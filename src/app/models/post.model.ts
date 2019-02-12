export class Post {
    id: number
    title: string
    body: string
    author: string
    date?: string
    likeCounter: number
    constructor(){
        this.likeCounter = 0
    }
}

export interface PostResolved {
    post: Post
    error?: any
}