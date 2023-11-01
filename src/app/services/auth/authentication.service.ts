import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { JWTDecoded, LoginForm, RegisterForm } from '../../interfaces/auth.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserFake } from './fake-data-user';

import { environment } from 'src/environments/environment';

const BASE_URL = environment.API_URL;
export const JWT_NAME = 'access_token';
const token_fake = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  register(user: RegisterForm) {
    // return this.http.post<any>(`${BASE_URL}/api/users/`, user).pipe(
    //   map(user => user)
    // );
    if (user.email === UserFake.email && user.password === UserFake.password) {
      const { password, ...result } = UserFake; // le quitamos la password, devolverá el mismo user pero con un id
      return of ( result )
    } else { // simulamos un error del servidor si no se registra con los valores proporcionados de ejemplo en el html
      return throwError(()=> 'Error en el servidor');
    }
  }

  login(loginForm: LoginForm) {
    // TODO si tuviéramos un backend esta sería la petición
    // return this.http.post<any>(`${BASE_URL}/api/users/login`, { email: loginForm.email, password: loginForm.password }).pipe(
    //   map((token) => {
    //     localStorage.setItem(JWT_NAME, token.access_token);
    //     return token;
    //   }),
    //   catchError(error => { ....
    // )
    const email = loginForm.email;
    const password = loginForm.password;

    console.log('## Sending credentials: ', email, password);

    // if (email === 'test@test.com' && password === 'test12345678') {
    if (email === UserFake.email && password === UserFake.password) {
      console.log('## access_token: ', token_fake);
      console.log('PAY ATTEMPTION!! look for the "access_token" in the local storage');
      return of(token_fake); // TODO esto sería en verdad tarea del backend devolvernos el token encriptado a partir del payload
    } else {
      // simulamos error
      console.log('## error');
      return throwError(() => 'Wrong Credentials');
    }
  }

  logout() {
    // cualquier lógica necesaria de logout, reseteo de variables, subjectBehavior, etc
    // TODO si tuviéramos un backend, yo personalmente, avisaría al backend a través de una petición http GET para que ajuste sus cosas y resetee al usuario de la request, el jwt, etc. por seguridad.
    localStorage.removeItem(JWT_NAME);
  }

  // el guard isAuthenticated hace uso de esta función, para las rutas que necesitemos
  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }
  // TODO esto obtiene el user.id a partir del token del localstorage
  getUserId(): Observable<number> {
    if (this.isAuthenticated()) { // para que exista el token y no esté expirado.
      return of(localStorage.getItem(JWT_NAME)).pipe(
        switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
          tap((decoded: null | JWTDecoded) => console.log('# AuthenticationService.getUserId: ', decoded)),
          map((decoded: null | JWTDecoded) => {
            return decoded  ? decoded.user.id : 0;
          }
        )),
      ));
    } else { 
      return of(0)
    }
  }
}
