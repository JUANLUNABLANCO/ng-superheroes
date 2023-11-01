import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthenticationService } from './services/auth/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'superheroes-app';

  entries = [
    {
      name: 'Register',
      link: 'register',
      description: 'Register form' // puede usarse en un mat tooltip o algo similar
    },
    {
      name: 'Login',
      link: 'login',
      description: 'Login form'
    },
    {
      name: 'logout',
      link: 'logout',
      description: 'Logout'
    }
  ];
  constructor (
    private router: Router,
    private authService: AuthenticationService
  ) {
    // esto es solo en desarrollo
    if( !environment.production) {
      console.log('Enviroment Control: ', environment.CONTROL);
      console.log('Enviroment API_URL: ', environment.API_URL);
      console.log('Environment IMAGE_BASE_PATH: ', environment.IMAGE_BASE_PATH);
    }
  }

  navigateTo(value: string) {
    if (value !== 'logout') {
      this.router.navigate(['../', value]);
    } else {
      this.authService.logout();
      this.router.navigate(['../superheroes']);
    }
  }
}
