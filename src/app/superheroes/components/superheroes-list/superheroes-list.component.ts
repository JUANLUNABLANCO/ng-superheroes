import { Component, OnInit } from '@angular/core';
import { SuperheroesService } from '../../services/superheroes.service';
import { Superheroe } from '../../models/superheroe.model';

@Component({
  selector: 'app-superheroes-list',
  templateUrl: './superheroes-list.component.html',
  styleUrls: ['./superheroes-list.component.css']
})
export class SuperheroesListComponent implements OnInit {
  superheroes: Superheroe[];
  constructor(
    private superheroesService: SuperheroesService
  ) {}
  ngOnInit() {
    this.superheroesService.getListSuperheroes().subscribe({
      next: (superheroes: Superheroe[]) => {
        console.log('## superheroes', superheroes);
        this.superheroes = superheroes;
      },
      error: (err) => {
        console.error('Error controlado: ', err);
      },
      complete: () => {
        // TODO podemos poner aquí el atributo  carga = false y que esa constante se encargue de dibujar un spin en lavista
        console.log('carga completa');
      }
  })
  }
}
