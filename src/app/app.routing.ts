import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CreatePostComponent } from './create-post/create-post.component'

import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard'
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddCommentComponent } from './add-comment/add-comment.component';


const routes: Routes = [
    {path:'', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'create-post', component: CreatePostComponent},
    {path: 'edit-post', component: EditPostComponent},
    {path: 'post-details', component : PostDetailsComponent},
    {path: 'add-comment', component : AddCommentComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}