import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
// # reactive forms
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { Observable, of, from } from 'rxjs';

class CustomValidators { // TODO si hay mas validaciones custom, llevar esto a un fichero a parte
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if((password === confirmPassword) ) {
      return null;
    } else {
      return { passwordsMatching: true };
    }
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    // private userService: UserService,  // TODO por hacer un servicio de usuarios, CRUD
    private router: Router
  ) {}

  ngOnInit() {
    this.formRegister = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], [this.userExist.bind(this)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    },
    { // validaciones custom
      validators: CustomValidators.passwordsMatch
    });
  }
  // # getters
  get nameField() {
    return this.formRegister.get('name');
  }
  get emailField() {
    return this.formRegister.get('email');
  }
  get passwordField() {
    return this.formRegister.get('password');
  }
  get confirmPasswordField() {
    return this.formRegister.get('confirmPassword');
  }
  onChange($event: any) {
    // console.log('### KEYUP: ', $event.target.value); // TODO sería más eficiente meterle un debounceTime(), no por cada pulsación de tecla
    this.emailField?.updateValueAndValidity();
  }
  userExist(control: FormControl): Observable<ValidationErrors | null> {
    // TODO si tuviesemos un bakend esto sería así
    // if (control.valid) { // antes no tiene sentido hacer peticiones
    // return from(this.userService.userExist(control.value))
    //   .pipe(map((userExist) => {
    //     if(userExist) {
    //       return { emailIsUsed: true }
    //     } else {
    //       return null;
    //     }
    //   }))
    // }
    // return null;

    // simulamos que no existe ningún usuario con ese email, o si preferimos ver el error usamos este
    if (control.value === 'error@email.taken') return of({ emailIsUsed: true});
    return of(null);
  }

  onSubmit(form: FormGroup) {
    if(this.formRegister.invalid) {
      return;
    }
    this.authService.register(this.formRegister.value)
      // .pipe(
      //   map(user => this.router.navigate(['login']))
      // )
    .subscribe({
      next: (token) => {
        if (token) this.router.navigate(['login']);
      },
      error: (err: any) => {
        console.error('Error controlado: ', err);
      },
      complete: () => {
        console.log('login complete');
      }
    });
  }
}
