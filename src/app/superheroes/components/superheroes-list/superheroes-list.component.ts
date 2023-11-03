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
    this.superheroesService.getListSuperheroesPaginated().subscribe({
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
      this.superheroesService.getListSuperheroesPaginated(page, size).pipe(
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

  findByName(name: string) {
    this.superheroesService.paginateByName(0, 10, name ).pipe(
      map((superheroesPaginated: ISuperheroesPaginated) => this.dataSource = superheroesPaginated)
    ).subscribe();
  }

  // addNewRow() {
  //   const newSuperhero: Superhero = {
  //     id: 0,
  //     name: "New Super Hero",
  //     alias: "new",
  //     powers: ["Super strength", "Flight", "Heat vision"],
  //     enemies: ["Lex Luthor", "Doomsday"],
  //     city: "City",
  //     image: "",
  //     bio: "Lore ipsum dolor sit amen..."
  //   };
  //   this.dataSource.items = [newSuperhero, ...this.dataSource.items];

  //   this.creatingSuperhero = true;
  // }
  // createSuperhero(newSuperhero: Superhero) {
  //   console.log('Nuevo superheroe: ', newSuperhero);
  //   this.superheroesService.createSuperhero(newSuperhero).subscribe(newSuperheroesFakeList => {
  //     console.log(newSuperheroesFakeList);
  //   });
  // }
}
