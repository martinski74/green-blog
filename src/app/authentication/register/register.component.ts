import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { RegisterModel } from '../models/register.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel
  errorMessage: string
  loginFailed: boolean

  constructor(private authService: AuthService, private router: Router) {
    this.model = new RegisterModel('', '', '', 18)
  }

  ngOnInit() {}

  register() {
    delete this.model['confirmPassword']
    this.authService.register(this.model).subscribe(
      data => {
        this.router.navigate(['/login'])
      },
      err => {
        this.loginFailed = true
        this.errorMessage = err.error.description
      }
    )
  }
}
