import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';


const appKey = 'kid_SJNpt2V7N' 
const appSecret = '68b1fb2d135445cd847f81db0c403d27' 
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthService {

    private currentAuthToken: string

  constructor(private http: HttpClient) { }

  register(model: RegisterModel){
    return this.http.post(registerUrl,
       JSON.stringify(model),
        {
            headers: this.createAuthHeader('Basic')
        })
  }

  login(model : LoginModel){

    return this.http.post(loginUrl, JSON.stringify(model),{
      headers: this.createAuthHeader('Basic')
    })
   
  }


  logout(){
    localStorage.clear()
        return this.http.post(logoutUrl,{},{
            headers: this.createAuthHeader('Kinvey')
        })
        
    }

  checkIfLoggedIn(){
    return this.currentAuthToken === localStorage.getItem('authtoken')
}

get authtoken(){
    return this.currentAuthToken
}
set authtoken(value: string){
    this.currentAuthToken = value
}

  private createAuthHeader(type: string) {
    if (type === 'Basic') {
      return new HttpHeaders({
          'Authorization':`Basic ${btoa(`${appKey}:${appSecret}`)}`,
          'Content-Type':'application/json'
      })
  } else{
      return new HttpHeaders({
          'Authorization':`Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type':'application/json'
      })
  }
  }
}
