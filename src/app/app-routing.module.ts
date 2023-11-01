import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserIsAuthenticatedComponent } from './components/user-is-authenticated/user-is-authenticated.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superheroes',
    pathMatch: 'full'
  },
  {
    path: 'superheroes',
    loadChildren: () => import('./superheroes/superheroes.module').then(m => m.SuperheroesModule) // lazy loading
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-is-authenticated',
    component: UserIsAuthenticatedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'superheroes',
    pathMatch: 'full'
  }
  // TODO si la app evolucionara hacia tener unos usuarios y un administrador, este sería el camino a seguir
  // ,{
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  // en la ruta del AdminModule, pondríamos un canActivate: ['AuthGuard', 'AdminGuard']
  // },
  // {
  //   path: 'users',
  //   children:[
  //     {
  //       path: '',
  //       component: UsersComponent
  //     },
  //     {
  //       path: ':id',
  //       component: UserProfileComponent
  //     }
  //   ]
  // },
  // {
  //   path: 'update-profile',
  //   component: UpdateUserProfileComponent,
  //   canActivate: [AuthGuard, userIsUserGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
