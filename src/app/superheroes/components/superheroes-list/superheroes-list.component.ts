import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

import { SuperheroesService } from '../../services/superheroes.service';
import { Superhero, ISuperheroesPaginated } from '../../models/superhero.model';

@Component({
  selector: 'app-superheroes-list',
  templateUrl: './superheroes-list.component.html',
  styleUrls: ['./superheroes-list.component.css']
})
export class SuperheroesListComponent implements OnInit {
  superheroes: Superhero[];
  // tabla
  dataSource: ISuperheroesPaginated;
  displayedColumns = ['id', 'name', 'alias', 'city', 'image', 'actions' ]; // mostrar algunos datos y el resto cuando entre en el detalle

  // paginator
  pageEvent: PageEvent;
  pageSizeOptions = [5,10,25,100];

  // filtering
  filterValue: string = '';

  // helpers
  creatingSuperhero = false;

  constructor(
    private superheroesService: SuperheroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.initDataSource();
  }
  private initDataSource() {
    // TODO sin paginación: this.superheroesService.getListSuperheroesPaginatedFake().subscribe({
      this.superheroesService.paginateByName().subscribe({
      next: (superheroesPaginated: ISuperheroesPaginated) => {
        console.log('## superheroes', superheroesPaginated);
        this.dataSource = superheroesPaginated;
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

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    const size = event.pageSize;

    if(this.filterValue == '') {
      page = page + 1;
      this.superheroesService.paginateByName(page, size).pipe(
        map((superheroesPaginated: ISuperheroesPaginated) => this.dataSource = superheroesPaginated)
      ).subscribe();
    } else {
      this.superheroesService.paginateByName(page, size, this.filterValue).pipe(
        map((usersPaginated: ISuperheroesPaginated) => this.dataSource = usersPaginated)
      ).subscribe()
    }
  }

  // navigateToHeroeDetail(id: number) {
  //   this.router.navigate(['./' + Number(id)], { relativeTo: this.activatedRoute });
  // }

  findByName(filterValue: string) {
    // TODO con backend
    // this.superheroesService.paginateByName(0, 10, name ).pipe(
    //   map((superheroesPaginated: ISuperheroesPaginated) => this.dataSource = superheroesPaginated)
    // ).subscribe();
    this.superheroesService.filterByName(filterValue).subscribe({
      next: (newSuperheroesFiltered) => {
        console.log(`Nuevo array de superheroes filtrado por: ${filterValue} `, newSuperheroesFiltered);
        this.dataSource.items = newSuperheroesFiltered;
      }
    });
  }
}
