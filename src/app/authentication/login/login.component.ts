import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel
  loginFailed: boolean
  errorMessage: string
  
  constructor(private authService : AuthService, private router : Router) {
    this.model = new LoginModel('','')
   }

  ngOnInit() {
  }
  login(){
  
    this.authService.login(this.model)
    .subscribe(
      data =>{
       this.successfulLogin(data)
       swal({
        icon: "success",
        title: "You are loged in!"
      })
     },
     err => {
      
       this.loginFailed = true
       console.log(err)
        this.errorMessage = err.error.description
     })
  
   }
  successfulLogin(data){
    this.authService.authtoken = data['_kmd']['authtoken']
    localStorage.setItem('authtoken', data['_kmd']['authtoken'])
    localStorage.setItem('username',data['username'])
    this.router.navigate(['/home'])
   
  }

}
