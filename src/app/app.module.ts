import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// genericos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// # reactive forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Material
import { MaterialModule } from './material/material.module';

// # librerias externas
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

// # INTERCEPTORS
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

// components
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserIsAuthenticatedComponent } from './components/user-is-authenticated/user-is-authenticated.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserIsAuthenticatedComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    // @auth0 nos provee una forma cómoda de crear un interceptor y además para codificar y decodificar jwt
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
