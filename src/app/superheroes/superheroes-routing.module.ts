import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import { SuperheroDetailComponent } from './components/superhero-detail/superhero-detail.component';
import { SuperheroCreateComponent } from './components/superhero-create/superhero-create.component';
import { SuperheroEditComponent } from './components/superhero-edit/superhero-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SuperheroesListComponent
  },
  {
    path: 'create',
    component: SuperheroCreateComponent
  },
  {
    path: 'detail/:id',
    component: SuperheroDetailComponent
  },
  {
    path: 'edit/:id',
    component: SuperheroEditComponent
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
