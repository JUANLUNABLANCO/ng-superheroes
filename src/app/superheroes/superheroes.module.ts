import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import { SuperheroesListItemComponent } from './components/superheroes-list/superheroes-list-item/superheroes-list-item.component';
import { SuperheroeDetailComponent } from './components/superheroe-detail/superheroe-detail.component';


@NgModule({
  declarations: [
    SuperheroesListComponent,
    SuperheroesListItemComponent,
    SuperheroeDetailComponent
  ],
  imports: [
    CommonModule,
    SuperheroesRoutingModule
  ]
})
export class SuperheroesModule { }
