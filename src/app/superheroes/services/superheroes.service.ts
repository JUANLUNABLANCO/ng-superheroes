import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Superhero, ISuperheroesPaginated } from '../models/superhero.model';
import { SuperheroesFake, SuperheroesPaginatedFake, PowersFake, EnemiesFake } from './fake-data-superheroes';
import { environment } from 'src/environments/environment';
import { Observable, of, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const BASE_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  constructor(
    private http: HttpClient
  ) { }

  getListSuperheroes(): Observable<Superhero[]> {
    // TODO si existe backend
    // return  this.http.get<Superheroe[]>(`${BASE_URL}/api/superheroes`).pipe(
    //   map((superheroes: Superheroe[]) => {
    //     return superheroes;
    //   }),
    //   catchError(err => throwError(() => new Error(err)))
    // );
    return of(SuperheroesFake) // fake data
  }
  getListSuperheroesPaginatedFake(page=1, limit=10): Observable<ISuperheroesPaginated> {
    // TODO si hubiese backend sería algo así
    // let params = new HttpParams();

    // params = params.append('page', Number(page));
    // params = params.append('limit', Number(limit));

    // return this.http.get<ISuperheroesPaginated>(`${BASE_URL}/api/superheores`, {params}).pipe(
    //   map((superheroesPaginated: ISuperheroesPaginated) => {
    //     console.log(superheroesPaginated);
    //     return superheroesPaginated}),
    //   catchError(err => throwError(()=> new Error(err)))
    // );

    // SIN  backend ##########
    return of(SuperheroesPaginatedFake); // simulamos una paginación en los propios datos devueltos
  }
  paginateByName(page: number=1, size: number=10, name: string=''): Observable<ISuperheroesPaginated> {
    // TODO con backend
    // let params = new HttpParams();

    // params = params.append('page', String(page));
    // params = params.append('limit', String(size));
    // params = params.append('name', name);

    // return this.http.get<ISuperheroesPaginated>(`${BASE_URL}/api/superheroes`, {params}).pipe(
    //   map((superheroesData: ISuperheroesPaginated) => superheroesData),
    //   catchError(err => throwError(()=> new Error(err)))
    // )
    // TODO simular paginación con filtro name pero haciéndola de vardad a partir del array de datos fake
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    const paginatedSuperheroes = SuperheroesFake.slice(startIndex, endIndex);

    console.log('superheroes paginados: ', paginatedSuperheroes);

    const totalItems = SuperheroesFake.length;
    const itemCount = paginatedSuperheroes.length;
    const totalPages = Math.ceil(totalItems / size);

    const currentPage = page;

    const links = {
      first: `${BASE_URL}/users?limit=${size}`,
      last: `http://127.0.0.1:3000/api/users?page=${totalPages}&limit=${size}`,
      next: currentPage < totalPages
        ? `http://127.0.0.1:3000/api/users?page=${currentPage + 1}&limit=${size}`
        : "",
      previous: currentPage > 1
        ? `http://127.0.0.1:3000/api/users?page=${currentPage - 1}&limit=${size}`
        : ""
    };

    const meta = {
      totalItems: totalItems,
      itemCount: itemCount,
      itemsPerPage: size,
      totalPages: totalPages,
      currentPage: currentPage
    };

    return of({
      items: paginatedSuperheroes,
      meta: meta,
      links: links
    });
  }
  filterByName(filterValue: string): Observable<Superhero[]> {
    return of(SuperheroesFake.filter(superhero => superhero.name.toLowerCase().includes(filterValue.toLowerCase())));
  }
  getSuperhero(id: number): Observable<Superhero> {
    // TODO si hubiese backend
    // return this.http.get(`${BASE_URL}/api/superheroes/` + id).pipe(
    //   map((superheroe: Superheroe) => superheroe),
    //   catchError(err => throwError(() => new Error(err)))
    // );

    // SIN backend ##########
    const foundedSuperhero = this.searchSuperheroeById(id);
    if (foundedSuperhero !== undefined ) {
      console.log('## getSuperhero: Superhéroe encontrado:', foundedSuperhero);
      return of(this.searchSuperheroeById(id));
    } else {
      return throwError(() => new Error('Superhéroe no encontrado'));
    }
  }
  private searchSuperheroeById(id: number): Superhero {
    const superheroId = Number(id);
    const foundSuperhero = SuperheroesFake.find(superhero => superhero.id === superheroId);
    console.log('## searchSuperheroById: Superhéroe encontrado:', foundSuperhero);
    if (foundSuperhero !== undefined ) {
      return foundSuperhero;
    } else {
      throw new Error('Superhéroe no encontrado');
    }
  }

  createSuperhero(superhero: any): Observable<Superhero[]> {
    // TODO backend
    // return this.http.post(`${BASE_URL}/superheroes`, superhero);

    // sin backend ##########
    superhero.id = SuperheroesFake.length + 1;
    console.log('## superhero: ', superhero);
    SuperheroesFake.push(superhero);
    // retornamos el array
    return of(SuperheroesFake);
    // o retornamos el objeto paginación
    // TODO paginacion return // esto de la paginación se complica con datos fake, mucho demasiado...
}
  updateSuperhero(id: number, superhero: any): Observable<Superhero[]> {
    // TODO backend 
    // return this.http.put(`${BASE_URL}/superheros/${id}`, changes);

    // SIN backend ##########
    const index = SuperheroesFake.findIndex((itemArray) => itemArray.id === id);
    if (index !== -1) {
      // algunos datos los perdemos por el camino
      superhero.id = id;
      superhero.image = SuperheroesFake[index].image;
      SuperheroesFake[index] = superhero;
      return of(SuperheroesFake); // Devuelve el objeto actualizado o Devolvemos el array Paginado de superheroes
    } else {
      // El objeto con ese id no se encontró
      return of(SuperheroesFake);
    }
  }
  deleteSuperhero(id: number): Observable<Superhero[]> | null {
    // return this.http.delete(`${BASE_URL}/superheros/${id}`);
    const index = SuperheroesFake.findIndex((superhero) => superhero.id === Number(id));
    if (index !== -1) {
      const deletedSuperhero = SuperheroesFake.splice(index, 1)[0];
      // TODO devuelve la paginacion nueva sin el objeto borrado
      console.log('## deleted superhero: ', SuperheroesFake);
      return of(SuperheroesFake); // Devuelve el nuevo array
    } else {
      // El objeto con ese id no se encontró
      return null;
    }
  }
  getPowers(): Observable<string[]> {
    // TODO si hubiese backend
    // return this.http.get<string[]>(`${BASE_URL}/api/powers`);
    return of(PowersFake); // fake data
  }
  getEnemies(): Observable<string[]> {
    // TODO si hubiese backend
    // return this.http.get<string[]>(`${BASE_URL}/api/enemies`);
    return of(EnemiesFake); // fake data
  }
}
