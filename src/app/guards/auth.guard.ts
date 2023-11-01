import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  
  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      // TODO puedes crear una directiva para manejar este toast o Hacer una configuracion generica
      this.snackBar.open('debes estar authenticado para poder acceder a esta ruta', 'close', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: ['snackbar-type-soft-error']
      });
      this.router.navigate(['/login']);
      return false;
    } else {
      // logged in, so return true
      // this.router.navigate(['/update-profile']);  // esto no puedes ponerlo, ya es una ruta que accede aquí
      return true;
    }
  }
}