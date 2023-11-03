import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// # reactive forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Material
import { MaterialModule } from '../material/material.module';
import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import { SphListItemImageComponent } from './components/superheroes-list/sph-list-item-image/sph-list-item-image.component';
import { SuperheroDetailComponent } from './components/superhero-detail/superhero-detail.component';
import { SuperheroCreateComponent } from './components/superhero-create/superhero-create.component';
import { SuperheroEditComponent } from './components/superhero-edit/superhero-edit.component';


@NgModule({
  declarations: [
    SuperheroesListComponent,
    SphListItemImageComponent,
    SuperheroDetailComponent,
    SuperheroCreateComponent,
    SuperheroEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuperheroesRoutingModule,
    MaterialModule
  ]
})
export class SuperheroesModule { }
