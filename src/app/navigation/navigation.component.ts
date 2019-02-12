import { Component, OnInit } from '@angular/core'
import { AuthService } from '../authentication/auth.service'
import { Router } from '@angular/router'
import { LoginModel } from '../authentication/models/login.model'
import { debug } from 'util'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: any
  userName:string
  isLoged: boolean = true

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
   
  }
  ngAfterContentChecked(){
    this.userName = localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest'
  }

  loguot() {
    this.authService.logout().subscribe(data => {
      localStorage.clear()
      this.authService.authtoken = ''
      document.cookie = ''
      this.router.navigate(['/home'])
      this.isLoged = false
    })
  }
}
