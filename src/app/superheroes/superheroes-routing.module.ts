import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import { SuperheroeDetailComponent } from './components/superheroe-detail/superheroe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SuperheroesListComponent
  },
  {
    path: ':id',
    component: SuperheroeDetailComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperheroesRoutingModule { }
